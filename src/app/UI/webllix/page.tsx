"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Info } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';
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
  const [codePrompt, setCodePrompt] = useState<string>();

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
      const response = await fetch(url);
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
      setIncomingImages(images);
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
      
      // Combine codePrompt with additional instructions
      const fullPrompt = `${codePrompt} build landing page  HTML using Tailwind CSS based on this image.use image link pexels`;
      formData.append('prompt', fullPrompt);
    
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

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
    
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Section */}
          <div className="lg:col-span-2 bg-gray-100 rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xl font-semibold mb-3" htmlFor="prompt">
                  Describe Your Vision
                </label>
                <textarea
                  id="prompt"
                  placeholder="Build a landing page for a startup looking for investors, with details on business models..."
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPrompt(e.target.value)
                  }
                  className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-center mt-8">
                <button
                  className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                  type="button"
                  onClick={handleGenerate}
                >
              <Send />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Output Section */}
          <div className="bg-gray-100 rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6"></h2>
              <div className="flex-grow overflow-y-auto mb-6" style={{ maxHeight: '400px' }}>
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="loader border-t-4 border-purple-500 rounded-full w-12 h-12 animate-spin"></div>
                  </div>
                ) : showSuccessMessage ? (
                  <div className="bg-white p-6 rounded-xl shadow-md text-center">
                    <h3 className="text-3xl font-bold mb-4 text-purple-600">Success!</h3>
                    <p className="text-xl"></p>
                  </div>
                ) : (
                  <p className="text-xl text-center text-gray-500"></p>
                )}
              </div>
              {showSuccessMessage && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="codePrompt" className="block text-lg font-semibold mb-2">
                    About
                    </label>
                    <textarea
                      id="codePrompt"
                      value={codePrompt}
                      onChange={(e) => setCodePrompt(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      rows={3}
                      placeholder="About."
                    />
                  </div>
                  <button 
                    onClick={SendImage} 
                    disabled={codeLoading || !selectedImage}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                  >
                    {codeLoading ? 'Generating...' : 'Generate '}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webllix;
