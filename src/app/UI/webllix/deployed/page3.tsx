"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Info } from "lucide-react";
import { useRouter } from 'next/navigation';

const Webllix: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [incomingImages, setIncomingImages] = useState<{ url: string; width: number }[]>([]);
  const [company, setCompany] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [codePrompt, setCodePrompt] = useState<string>('Generate UI HTML using Tailwind CSS based on this image.');

  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserId(res.data.data._id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    // Automatically select the first image whenever incomingImages are updated
    if (incomingImages.length > 0) {
      fetchAndSetSelectedImage(incomingImages[0].url);
    } else {
      setSelectedImage(null);
    }
  }, [incomingImages]);

  useEffect(() => {
    // Show success message when an image is selected or generated
    if (incomingImages.length > 0 || selectedImage) {
      setShowSuccessMessage(true);
    } else {
      setShowSuccessMessage(false);
    }
  }, [incomingImages, selectedImage]);

  const fetchAndSetSelectedImage = async (url: string) => {
    try {
      const response = await fetch(url); // This URL is already proxied
      const blob = await response.blob();
      const file = new File([blob], "selected-image.jpg", { type: blob.type });
      setSelectedImage(file);
    } catch (error) {
      console.error("Error fetching image:", error);
      setSelectedImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    if (!userId) {
      router.push('/signup');
      return;
    }

    setLoading(true);
    setIncomingImages([]); // Clear previous images

    const fullPrompt = `${company} for ${prompt} landing page, website design`;

    try {
      const response = await fetch(`/api/users/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, prompt: fullPrompt, company }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate images.");
      }

      const { images } = await response.json();
      // Transform the image URLs to use the proxy
      const proxiedImages = images.map((img: { url: string; width: number }) => ({
        ...img,
        url: proxyImageUrl(img.url),
      }));
      setIncomingImages(proxiedImages);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : "Unknown error");
      alert("Image generation limit reached. You cannot generate more images.");
    } finally {
      setLoading(false);
    }
  };

  const SendImage = useCallback(async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setCodeLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage, selectedImage.name);
      formData.append('prompt', codePrompt);

      const response = await fetch('/api/users/openaigpt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate code');
      }

      const data = await response.json();
      const htmlCode = extractHtmlCode(data.result);
      setGeneratedCode(htmlCode);
      
      // Redirect to the code editor page with the generated code
      router.push(`/homepage/codeeditor?code=${encodeURIComponent(htmlCode)}`);
    } catch (error) {
      console.error('Error generating code:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate code. Please try again.');
    } finally {
      setCodeLoading(false);
    }
  }, [selectedImage, router, codePrompt]);

  // Function to extract only the HTML code
  const extractHtmlCode = (result: string): string => {
    const htmlRegex = /<html[\s\S]*?<\/html>/i;
    const match = result.match(htmlRegex);
    return match ? match[0] : result;
  };

  const proxyImageUrl = (url: string) => {
    return `/api/users/proxy/image?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="bg-gray-900 text-white flex h-screen p-10">
      <div className="flex-1 pr-8 overflow-hidden">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="prompt">
                Prompt
              </label>
              <textarea
                id="prompt"
                placeholder="Design a modern, visually appealing website for a tech startup..."
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setPrompt(e.target.value)
                }
                className="border border-gray-700 bg-gray-800 text-white px-4 py-3 rounded-md w-full h-32 resize-y overflow-auto text-lg"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2 items-center" htmlFor="company">
                Name
                <span
                  className="ml-2 text-gray-500 cursor-pointer relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Info className="w-4 h-4" />
                  {showTooltip && (
                    <div className="absolute top-full mt-1 text-sm text-white bg-gray-800 p-2 rounded shadow-lg z-10 whitespace-nowrap">
                      <p>Enter your company or store name (e.g., Webllix).</p>
                      <p>Ensure the name is correct to match with prompt for proper functionality</p>
                    </div>
                  )}
                </span>
              </label>
              <input
                id="company"
                placeholder="Webllix"
                type="text"
                value={company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompany(e.target.value)}
                className="border border-gray-700 bg-gray-800 text-white px-4 py-3 rounded-md w-full text-lg"
              />
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                className="text-white bg-gradient-to-r from-[#110501] to-[#FF6347] hover:from-[#FF6347] hover:to-[#6b80ec] shadow-lg hover:shadow-xl font-extralight rounded-full text-lg px-12 py-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                type="button"
                onClick={handleGenerate}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 pl-8 overflow-y-auto h-full">
        <div className="grid grid-cols-1 gap-8 overflow-y-auto max-h-full" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : showSuccessMessage ? (
            <div className="flex justify-center items-center h-full">
              <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-4xl font-bold mb-4">You have successfully</h2>
                <p className="text-xl">generated an image!</p>
              </div>
            </div>
          ) : (
            <p className="text-xl">No images generated yet.</p>
          )}
        </div>
        {showSuccessMessage && (
          <div className="mt-8 space-y-4">
            <div>
              <label htmlFor="codePrompt" className="block text-sm font-medium text-gray-300 mb-2">
                Code Generation Prompt
              </label>
              <textarea
                id="codePrompt"
                value={codePrompt}
                onChange={(e) => setCodePrompt(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows={3}
                placeholder="Enter prompt for code generation..."
              />
            </div>l
            <button 
              onClick={SendImage} 
              disabled={codeLoading || !selectedImage}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              {codeLoading ? 'Generating...' : 'Generate Code from Selected Image'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Webllix;
