"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, HelpCircle, SkipForward, Send, Info } from "lucide-react";



const Webllix: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [incomingImages, setIncomingImages] = useState<{ id: string; aspect_ratio: string }[]>([]);
  const [company, setCompany] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [codePrompt, setCodePrompt] = useState<string>('Generate UI HTML using Tailwind CSS based on this image.');
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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
    if (incomingImages.length > 0) {
      fetchAndSetSelectedImage(incomingImages[0].id);
    } else {
      setSelectedImage(null);
      setSelectedImageId(null);
    }
  }, [incomingImages]);

  useEffect(() => {
    if (incomingImages.length > 0 || selectedImage) {
      setShowSuccessMessage(true);
    } else {
      setShowSuccessMessage(false);
    }
  }, [incomingImages, selectedImage]);

  const fetchAndSetSelectedImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/users/generate?id=${imageId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();
      const contentType = response.headers.get('Content-Type') || 'image/jpeg';
      const file = new File([blob], "selected-image.jpg", { type: contentType });
      setSelectedImage(file);
      setSelectedImageId(imageId);
    } catch (error) {
      console.error("Error fetching image:", error);
      setSelectedImage(null);
      setSelectedImageId(null);
    }
  };

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const fullPrompt = `${company} for ${prompt} landing page, website design`;

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
      setIncomingImages(images);
      
      if (images.length > 0) {
        await fetchAndSetSelectedImage(images[0].id);
      }

      setShowSuccessMessage(true);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: "assistant", content: "Great! The image has been generated. What type of services or items do you offer?" }
      ]);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, company, userId]);

  const handleCodeGeneration = useCallback(async () => {
    setIsGenerating(true);
    try {
      if (!selectedImage || !selectedImageId) {
        throw new Error("Please select an image first.");
      }

      const formData = new FormData();
      formData.append('imageId', selectedImageId);
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
      
      router.push(`/homepage/codeeditor?code=${encodeURIComponent(htmlCode)}`);
    } catch (error) {
      console.error('Error generating code:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedImage, selectedImageId, router, codePrompt]);

  const extractHtmlCode = (result: string): string => {
    const htmlRegex = /<html[\s\S]*?<\/html>/i;
    const match = result.match(htmlRegex);
    return match ? match[0] : result;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Image src="/loading.gif" alt="Loading" width={100} height={100} />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 flex items-center border-b">
          <ArrowLeft className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-semibold">Webllix AI Assistant</h1>
          <div className="flex-grow" />
          <Button variant="outline" onClick={() => router.push('/homepage/codeeditor')}>End Chat & Continue</Button>
        </header>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "assistant" ? "bg-white" : "bg-blue-500 text-white"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mb-2">
                    A
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2 mb-2">
            <Button variant="outline" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help me answer
            </Button>
            <Button variant="outline" size="sm">
              <SkipForward className="w-4 h-4 mr-2" />
              Skip question
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push('/homepage/codeeditor')}>
              End chat & continue
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Write your answer" 
              className="flex-grow" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button size="icon" onClick={handleGenerate} disabled={isGenerating}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-white p-8 border-l">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="company">
              Company Name
              <span
                className="ml-2 text-gray-500 cursor-pointer relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Info className="w-4 h-4 inline" />
                {showTooltip && (
                  <div className="absolute top-full mt-1 text-sm text-white bg-gray-800 p-2 rounded shadow-lg z-10 whitespace-nowrap">
                    <p>Enter your company or store name (e.g., Webllix).</p>
                    <p>Ensure the name is correct to match with prompt for proper functionality</p>
                  </div>
                )}
              </span>
            </label>
            <Input
              id="company"
              placeholder="Webllix"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          {showSuccessMessage && (
            <div className="space-y-4">
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
              </div>
              <button 
                onClick={handleGenerate} 
                disabled={isGenerating || !selectedImage}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
              >
                {isGenerating ? (
                  <Image src="/loading.gif" alt="Generating..." width={24} height={24} />
                ) : (
                  'Generate Code from Selected Image'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Webllix;

/// this white  backgorund is used  in 