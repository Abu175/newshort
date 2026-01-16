
"use client";
import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent, useCallback } from 'react';
import { Download, Code, Eye, Smartphone, Monitor, Palette, Droplet, Play } from 'lucide-react';
import Alert from '@/app/webuilder/make/alert/page';
import StyleControls from '@/app/webuilder/make/style/page';
import AlertDescription from '@/app/webuilder/make/alertdescription/page';
import Client from '@/app/webuilder/make/client/page'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useSearchParams } from 'next/navigation';
import ChatInterface from '@/app/UI/webllix/chat/page';

interface CodePreviewProps {
    initialCode: string;
  }

  const CodePreview: React.FC<CodePreviewProps> = ({ initialCode }) => {
    const [code, setCode] = useState<string>(initialCode);
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('code');
    const [codeType, setCodeType] = useState<string>('html');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isApplyingColor, setIsApplyingColor] = useState<boolean>(false);
    const [isApplyingImage, setIsApplyingImage] = useState<boolean>(false);
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [imageSize, setImageSize] = useState<string>('medium');
    const [selectedAnimation, setSelectedAnimation] = useState<string>('');
    const [isApplyingAnimation, setIsApplyingAnimation] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const [customPrompt, setCustomPrompt] = useState<string>('Generate HTML code for a simple webpage');
    const [images, setImages] = useState<{ [key: string]: File }>({});
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [imageCounter, setImageCounter] = useState(0);
    const [showChangePrompt, setShowChangePrompt] = useState(false);
    const [changePrompt, setChangePrompt] = useState('');
    const [changeImage, setChangeImage] = useState<File | null>(null);
    const searchParams = useSearchParams();
    const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);
    const [originalCode, setOriginalCode] = useState<string>('');
    const selectedElementRef = useRef<HTMLElement | null>(null);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [isStyleControlsOpen, setIsStyleControlsOpen] = useState<boolean>(true);

    // Replace the state variables with refs
    const hoveredElementRef = useRef<Element | null>(null);

    // Modify the handleMouseEvent function
    const handleMouseEvent = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as Element;
        if (event.type === 'mouseover') {
            hoveredElementRef.current = target;
        } else if (event.type === 'mouseout') {
            hoveredElementRef.current = null;
        } else if (event.type === 'click') {
            if (target instanceof HTMLElement) {
                selectedElementRef.current = target; // Keep the selected element
                target.classList.add('selected'); // Add a class to highlight the selected element
                setShowChangePrompt(true); // Show the change prompt modal
                forceUpdate(); // Force re-render if needed
            }
        }
    }, []);

    // Add this to force re-render when needed
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        try {
            if (code.trim().startsWith('<')) {
                setOutput(code);
                setError('');
            } else {
                const transformedCode = code
                    .replace(/className=/g, 'class=')
                    .replace(/\{([^}]+)\}/g, (_, content) => {
                        try {
                            return new Function(`return ${content}`)();
                        } catch {
                            return `\${${content}}`;
                        }
                    });
                setOutput(transformedCode);
                setError('');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    }, [code]);

    const applyStyleToSelection = (style: { [key: string]: string }) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            for (const [styleProperty, value] of Object.entries(style)) {
                span.style[styleProperty as any] = value;
            }
            applyStyle(span, range);
        }
    };

    const applyStyle = (span: HTMLSpanElement, range: Range) => {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
        updateOutputAndCode();
    };

    const updateOutputAndCode = () => {
        if (previewRef.current) {
            let updatedHtml = previewRef.current.innerHTML;
            
            // Replace inline base64 images with placeholders
            Object.entries(images).forEach(([imageId, imageSrc]) => {
                const regex = new RegExp(`style="[^"]*background-image: url\\(&quot;${imageSrc}&quot;\\)[^"]*"`, 'g');
                updatedHtml = updatedHtml.replace(regex, `data-image-id="${imageId}"`);
            });

            setOutput(updatedHtml);
            setCode(updatedHtml);
        }
    };

    const saveCode = useCallback(async () => {
      if (!previewRef.current) return;

      const zip = new JSZip();
      const fileExtension = codeType === 'html' ? 'html' : codeType === 'jsx' ? 'jsx' : 'tsx';
      
      // Get the current state of the preview
      let saveableCode = previewRef.current.innerHTML;

      // Process images
      const imagePromises = Object.entries(images).map(async ([imageId, file]) => {
        const imageContent = await file.arrayBuffer();
        zip.file(`images/${file.name}`, imageContent);
        return { imageId, fileName: file.name };
      });

      const processedImages = await Promise.all(imagePromises);

      if (codeType === 'html') {
        // For HTML, update image paths and create a style tag
        let styleContent = '';
        processedImages.forEach(({ imageId, fileName }) => {
          const imgRegex = new RegExp(`data-image-id="${imageId}"`, 'g');
          saveableCode = saveableCode.replace(imgRegex, `data-image-id="${imageId}" style="background-image: url('./images/${fileName}')"`);
          
          // Add to style content
          styleContent += `
            [data-image-id="${imageId}"] {
              background-size: ${imageSize};
              background-position: center;
              background-repeat: no-repeat;
            }
          `;
        });

        // Add style tag to the head of the HTML
        saveableCode = `
          <html>
            <head>
              <style>${styleContent}</style>
            </head>
            <body>
              ${saveableCode}
            </body>
          </html>
        `;
      } else {
        // Convert HTML to JSX/TSX
        saveableCode = saveableCode
          .replace(/class=/g, 'className=')
          .replace(/for=/g, 'htmlFor=')
          .replace(/style="([^"]*)"/g, (match, styles) => {
            const styleObject = styles.split(';').reduce((acc: Record<string, string>, style: string) => {
              const [key, value] = style.split(':').map((s: string) => s.trim());
              if (key && value) {
                const jsxKey = key.replace(/-./g, (x: string) => x.charAt(1).toUpperCase() + x.slice(2));
                acc[jsxKey] = value.replace(/"/g, "'");
              }
              return acc;
            }, {});
            return `style={${JSON.stringify(styleObject)}}`;
          })
          .replace(/(\w+)="(\{[^}]+\})"/g, (match: string, attr: string, value: string) => `${attr}=${value}`)
          .replace(/<([a-z]+)([^>]*)>/g, (match: string, tag: string, attrs: string) => {
            const jsxAttrs = attrs.replace(/(\w+)="([^"]+)"/g, (attrMatch: string, attr: string, value: string) => {
              if (attr === 'style') return attrMatch;
              return `${attr}="${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`;
            });
            return `<${tag}${jsxAttrs}>`;
          })
          .replace(/&nbsp;/g, '{" "}')
          .replace(/<!--(.*?)-->/g, '{/* $1 */}');

        // Replace image URLs with imports
        processedImages.forEach(({ imageId, fileName }) => {
          const imgRegex = new RegExp(`data-image-id="${imageId}"`, 'g');
          saveableCode = saveableCode.replace(imgRegex, `data-image-id="${imageId}" style={{backgroundImage: \`url(\${${imageId}})\`, backgroundSize: '${imageSize}', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}`);
        });

        // Wrap the code in a React component
        saveableCode = `
import React from 'react';
${processedImages.map(({ imageId, fileName }) => `import ${imageId} from './images/${fileName}';`).join('\n')}

const GeneratedComponent: React.FC = () => {
  return (
    <React.Fragment>
      ${saveableCode}
    </React.Fragment>
  );
};

export default GeneratedComponent;
`;
      }

      zip.file(`code.${fileExtension}`, saveableCode);

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'code_with_images.zip');
    }, [codeType, images, imageSize]);

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
    };

    const applyColor = useCallback(() => {
        setIsApplyingColor(true);
    }, []);

    const removeColor = () => {
        setIsApplyingColor(false);
        applyStyleToSelection({ backgroundColor: '' });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageId = `img_${imageCounter}`;
        setImages(prevImages => ({ ...prevImages, [imageId]: file }));
        const objectUrl = URL.createObjectURL(file);
        setImageUrls(prevUrls => ({ ...prevUrls, [imageId]: objectUrl }));
        setImageCounter(prevCounter => prevCounter + 1);
        setImageSrc(objectUrl);
      }
    };

    const applyImage = useCallback(() => {
      if (imageSrc) {
        setIsApplyingImage(true);
      }
    }, [imageSrc]);

    const removeImage = () => {
        setIsApplyingImage(false);
        applyStyleToSelection({ backgroundImage: '' });
    };

    const handlePreviewClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (isApplyingColor) {
            target.style.backgroundColor = selectedColor;
            setIsApplyingColor(false);
        }
        if (isApplyingImage) {
            const imageId = `img_${imageCounter - 1}`;
            target.setAttribute('data-image-id', imageId);
            target.style.backgroundImage = `url(${imageSrc})`;
            target.style.backgroundSize = imageSize;
            target.style.backgroundPosition = 'center';
            target.style.backgroundRepeat = 'no-repeat';
            setIsApplyingImage(false);
        }
        if (isApplyingAnimation && selectedAnimation) {
            target.style.animation = `${selectedAnimation} 1s`;
            target.style.animationFillMode = 'both';
            setIsApplyingAnimation(false);
        }
        updateOutputAndCode();
    }, [isApplyingColor, isApplyingImage, isApplyingAnimation, selectedColor, imageSrc, imageSize, selectedAnimation, imageCounter]);

    const toggleMobileView = () => {
        setIsMobileView(!isMobileView);
    };

    const handleImageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setImageSize(e.target.value);
    };

    const removeAppliedStyle = (style: 'color' | 'image') => {
        if (previewRef.current) {
            const elements = previewRef.current.querySelectorAll('*');
            elements.forEach((el) => {
                if (el instanceof HTMLElement) {
                    if (style === 'color') {
                        el.style.removeProperty('background-color');
                    } else if (style === 'image') {
                        el.style.removeProperty('background-image');
                        el.style.removeProperty('background-size');
                        el.style.removeProperty('background-position');
                        el.style.removeProperty('background-repeat');
                    }
                }
            });
            updateOutputAndCode();
        }
    };

    const handleAnimationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAnimation(e.target.value);
    };

    const applyAnimation = () => {
        if (selectedAnimation) {
            setIsApplyingAnimation(true);
        }
    };

    const removeAllAnimations = () => {
        if (previewRef.current) {
            const elements = previewRef.current.querySelectorAll('*');
            elements.forEach((el) => {
                if (el instanceof HTMLElement) {
                    el.style.removeProperty('animation');
                    el.style.removeProperty('animation-fill-mode');
                }
            });
            updateOutputAndCode();
        }
    };

    const extractComponents = (htmlString: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const elements = doc.body.querySelectorAll('*');
        const uniqueComponents = new Set<string>();
        elements.forEach((el) => {
            if (el.tagName && el.tagName.includes('-')) {
                uniqueComponents.add(el.tagName.toLowerCase());
            } else if (el.tagName) {
                uniqueComponents.add(el.tagName.toLowerCase());
            }
        });
    };

    useEffect(() => {
        extractComponents(output);
    }, [output]);

    const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCustomPrompt(e.target.value);
    };

    const handleSendPrompt = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('prompt', customPrompt);
        Object.entries(images).forEach(([imageId, file]) => {
          formData.append(imageId, file);
        });

        const response = await fetch('/api/users/generate/openai', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to generate code');
        }

        const data = await response.json();
        setCode(data.result);
        setOutput(data.result);
        setOriginalCode(data.result);
        
        // Start the conversation history
        setConversationHistory([
          { role: 'user', content: customPrompt },
          { role: 'assistant', content: data.result }]);
        
        setActiveTab('code');
        setIsChatOpen(true); // Open chat interface when generating code
      } catch (error) {
        console.error('Error generating code:', error);
        setError('Failed to generate code. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setSelectedImage(file);
      } else {
        setSelectedImage(null);
      }
    };

    const handleSendChanges = async () => {
        setLoading(true);
        try {
            const selectedElement = selectedElementRef.current; // Get the currently selected element
            const selectedCode = selectedElement ? selectedElement.outerHTML : ''; // Get its HTML

            const formData = new FormData();
            formData.append('prompt', changePrompt); // The prompt for changes
            formData.append('selectedCode', selectedCode); // The selected code to change
            formData.append('fullCode', code); // The full code context
            formData.append('originalCode', originalCode); // The original code for reference
            formData.append('isContinuation', 'true'); // Indicate this is a continuation

            // Add conversation history
            conversationHistory.forEach((message, index) => {
                formData.append(`conversationHistory[${index}]`, JSON.stringify(message));
            });

            // Add the change image if it exists
            if (changeImage) {
                formData.append('image', changeImage);
            }

            const response = await fetch('/api/users/generate/openai', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to generate code');
            }

            const data = await response.json();
            setCode(data.result); // Update the code with the new result
            setOutput(data.result); // Update the output to reflect changes

            // Update conversation history with the new change request and response
            setConversationHistory(prevHistory => [
                ...prevHistory,
                { role: 'user', content: changePrompt },
                { role: 'assistant', content: data.result }
            ]);

            setShowChangePrompt(false); // Hide the change prompt modal
            setChangePrompt(''); // Clear the change prompt
            setChangeImage(null); // Clear the change image
        } catch (error) {
            console.error('Error generating code:', error);
            setError('Failed to generate code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChangeImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setChangeImage(file);
      } else {
        setChangeImage(null);
      }
    };

    useEffect(() => {
      // Clean up object URLs when component unmounts
      return () => {
        Object.values(imageUrls).forEach(URL.revokeObjectURL);
      };
    }, []);

    useEffect(() => {
        const codeParam = searchParams.get('code');
        if (codeParam) {
            // Directly set the code without decoding
            setCode(codeParam);
            setOriginalCode(codeParam);
        }
    }, [searchParams]);

    const handleStyleChange = (style: any) => {
        // Handle style change here
        console.log('Style changed:', style);
        // You might want to update some state or perform other actions
    };

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'code' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('code')}
                    >
                        <Code className="inline-block mr-2" size={18} />
                        Code
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('preview')}
                    >
                        <Eye className="inline-block mr-2" size={18} />
                        Preview
                    </button>
                </div>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
                    onClick={saveCode}
                >
                    <Download className="inline-block mr-2" size={18} />
                    Download
                </button>
            </div>
            <div className="w-full flex">
                <div className="w-1/4 p-4 bg-gray-100">
                    {/* Minimized StyleControls and Client */}
                    <button onClick={() => setIsStyleControlsOpen(prev => !prev)}>
                        {isStyleControlsOpen ? 'Hide Styles' : 'Show Styles'}
                    </button>
                    {isStyleControlsOpen && <StyleControls onStyleChange={handleStyleChange} />}
                    <Client />
                </div>
                <div className={`w-1/2 p-4 ${isMobileView ? 'max-w-sm mx-auto' : ''}`}>
                    <div className={`${activeTab === 'preview' ? '' : 'hidden'} relative`}>
                        <div
                            ref={previewRef}
                            contentEditable
                            dangerouslySetInnerHTML={{ __html: output }}
                            className="min-h-[200px] max-h-[900px] overflow-auto outline-none"
                            onMouseOver={handleMouseEvent}
                            onMouseOut={handleMouseEvent}
                            onClick={handleMouseEvent}
                        />
                        {hoveredElementRef.current && hoveredElementRef.current !== selectedElementRef.current && (
                            <div
                                className="absolute border-2 border-blue-500 pointer-events-none"
                                style={{
                                    top: hoveredElementRef.current.getBoundingClientRect().top - previewRef.current!.getBoundingClientRect().top,
                                    left: hoveredElementRef.current.getBoundingClientRect().left - previewRef.current!.getBoundingClientRect().left,
                                    width: hoveredElementRef.current.getBoundingClientRect().width,
                                    height: hoveredElementRef.current.getBoundingClientRect().height,
                                }}
                            />
                        )}
                        {selectedElementRef.current && (
                            <div
                                className="absolute border-2 border-red-500 pointer-events-none"
                                style={{
                                    top: selectedElementRef.current.getBoundingClientRect().top - previewRef.current!.getBoundingClientRect().top,
                                    left: selectedElementRef.current.getBoundingClientRect().left - previewRef.current!.getBoundingClientRect().left,
                                    width: selectedElementRef.current.getBoundingClientRect().width,
                                    height: selectedElementRef.current.getBoundingClientRect().height,
                                }}
                            >
                                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 py-0.5">
                                    {selectedElementRef.current.tagName.toLowerCase()}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`${activeTab === 'code' ? '' : 'hidden'}`}>
                        <textarea
                            className="w-full h-64 p-2 font-mono text-sm outline-none border rounded"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder={`Enter your ${codeType.toUpperCase()} code here...`}
                        />
                    </div>
                    {isChatOpen && <ChatInterface messages={conversationHistory} />}
                    {showChangePrompt && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg w-96">
                          <textarea
                            className="w-full h-32 p-2 border rounded mb-4"
                            value={changePrompt}
                            onChange={(e) => setChangePrompt(e.target.value)}
                            placeholder="Describe the changes you want to make..."
                            onFocus={() => {
                                // Keep the selected element when focusing on the textarea
                                if (selectedElementRef.current) {
                                    selectedElementRef.current.classList.add('selected'); // Highlight the selected element
                                }
                            }}
                            onBlur={() => {
                                // Optional: Remove the highlight class when not focused
                                if (selectedElementRef.current) {
                                    selectedElementRef.current.classList.remove('selected');
                                }
                            }}
                          />
                          <div className="mb-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleChangeImageUpload}
                              className="mb-2"
                            />
                            {changeImage && (
                              <p className="text-sm text-green-600">Image selected: {changeImage.name}</p>
                            )}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                setShowChangePrompt(false);
                                setChangeImage(null);
                              }}
                              className="px-4 py-2 bg-gray-300 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSendChanges}
                              disabled={loading}
                              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                            >
                              {loading ? 'Sending...' : 'Send Changes'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                <div className="w-1/4 p-4 bg-gray-100">
                    <div className="flex flex-col space-y-4">
                        <select value={codeType} onChange={(e) => setCodeType(e.target.value)}>
                            <option value="html">HTML</option>
                            <option value="jsx">JSX</option>
                            <option value="tsx">TSX</option>
                        </select>
                        <select value={imageSize} onChange={handleImageSizeChange}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <input type="color" value={selectedColor} onChange={handleColorChange} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />                        <button onClick={applyColor}>Apply Color</button>
                        <button onClick={removeColor}>Remove Color</button>
                        <button onClick={applyImage}>Apply Image</button>
                        <button onClick={removeImage}>Remove Image</button>
                        <button onClick={() => removeAppliedStyle('color')}>Remove colours</button>
                        <button onClick={() => removeAppliedStyle('image')}>Remove Images</button>
                        <select value={selectedAnimation} onChange={handleAnimationChange}>
                            <option value="">Select Animation</option>
                            <option value="fadeIn">Fade In</option>
                            <option value="slideIn">Slide In</option>
                            <option value="bounce">Bounce</option>
                            <option value="rotate">Rotate</option>
                        </select>
                        <button onClick={applyAnimation}>Apply Animation</button>
                        <button onClick={removeAllAnimations}>Remove All Animations</button>
                        <textarea
                            value={customPrompt}
                            onChange={handlePromptChange}
                            placeholder="Enter your custom prompt here..."
                            className="w-full h-32 p-2 border rounded"
                        />
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        <button 
                            onClick={handleSendPrompt} 
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                            {loading ? 'Generating...' : 'Generate Code'}
                        </button>
                    </div>
                </div>
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <style jsx global>{`
                    #preview-container *[data-image-id] {
                        background-size: ${imageSize};
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    ${Object.entries(imageUrls).map(([imageId, url]) => `
                        #preview-container *[data-image-id="${imageId}"] {
                            background-image: url('${url}');
                        }
                    `).join('\n')}
                `}</style>
            </div>
        </div>
    );
};


export default CodePreview;

//Please change the background color of the selected element to blue. Here is the current code: 