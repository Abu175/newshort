"use client";
import {  Send, } from "lucide-react";


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Info } from "lucide-react";
import { useRouter } from 'next/navigation';



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
      fetchAndSetSelectedImage(incomingImages[0].id);
    } else {
      setSelectedImage(null);
      setSelectedImageId(null);
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
      
      // Automatically select the first image
      if (images.length > 0) {
        await fetchAndSetSelectedImage(images[0].id);
      }
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : "Unknown error");
      alert("Image generation limit reached. You cannot generate more images.");
    } finally {
      setLoading(false);
    }
  };

  const SendImage = useCallback(async () => {
    if (!selectedImage || !selectedImageId) {
      alert("Please select an image first.");
      return;
    }

    setCodeLoading(true);
    try {
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
      
      // Redirect to the code editor page with the generated code
      router.push(`/homepage/codeeditor?code=${encodeURIComponent(htmlCode)}`);
    } catch (error) {
      console.error('Error generating code:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate code. Please try again.');
    } finally {
      setCodeLoading(false);
    }
  }, [selectedImage, selectedImageId, router, codePrompt]);

  // Function to extract only the HTML code
  const extractHtmlCode = (result: string): string => {
    const htmlRegex = /<html[\s\S]*?<\/html>/i;
    const match = result.match(htmlRegex);
    return match ? match[0] : result;
  };

  return (
    <div className=" text-gray-900 min-h-screen p-6"style={{ backgroundImage: `url('/7.png')` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            {/* Input section */}
            <div className="space-y-6">
              {/* Prompt textarea */}
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
                  className="border border-gray-300 bg-white text-gray-900 px-4 py-3 rounded-md w-full h-32 resize-y overflow-auto text-lg"
                  rows={4}
                />
              </div>
              
              {/* Company name input */}
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
                  className="border border-gray-300 bg-white text-gray-900 px-4 py-3 rounded-md w-full text-lg"
                />
              </div>
              
              {/* Generate button */}
              <div className="flex justify-center mt-6">
                <button
                  className="text-white bg-gradient-to-r from-[#110501] to-[#FF6347] hover:from-[#FF6347] hover:to-[#6b80ec] shadow-lg hover:shadow-xl font-extralight rounded-full text-lg px-12 py-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  type="button"
                  onClick={handleGenerate}
                >
                <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            {/* Output section */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Image src="/loading.gif" alt="Loading" width={150} height={150} />
                </div>
              ) : showSuccessMessage ? (
                <div className="text-center">
                  <p className="text-2xl font-semibold text-green-500">Success: Image generated</p>
                  {/* Display generated image here */}
                </div>
              ) : (
                <p className="text-xl text-center">No images generated yet.</p>
              )}

              {showSuccessMessage && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="codePrompt" className="block text-sm font-medium text-gray-700 mb-2">
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
                    onClick={SendImage} 
                    disabled={codeLoading || !selectedImage}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                  >
                    {codeLoading ? 'Generating...' : 'Generate Code from Selected Image'}
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

///its displaying iamge id and sending to openia generatign code bas ehtisiamge sometime work sometime not  but difretn image id   and not dispalying iamg in code with white 