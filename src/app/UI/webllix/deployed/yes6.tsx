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
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 sm:text-6xl md:text-7xl">
            Design Your Perfect Website
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 md:mt-6">
            Harness the power of AI to create stunning website designs. Describe your vision, and watch it come to life.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Input Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Create Your Design</h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3" htmlFor="prompt">
                    Describe Your Vision
                  </label>
                  <textarea
                    id="prompt"
                    placeholder="Envision a modern, sleek website for a cutting-edge tech startup..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3" htmlFor="company">
                    Company Name
                  </label>
                  <input
                    id="company"
                    placeholder="Webllix"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  type="button"
                  onClick={handleGenerate}
                >
                  Generate Design
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="p-8 lg:p-12 bg-white">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Design</h2>
              <div className="space-y-8">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Image src="/loading.gif" alt="Loading" width={80} height={80} className="opacity-75" />
                  </div>
                ) : showSuccessMessage ? (
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-green-600 mb-6">Design Generated Successfully!</p>
                    {/* Display generated image here */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 shadow-inner">
                      {/* Placeholder for generated image */}
                      <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md"></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xl text-center text-gray-500">Your generated design will appear here.</p>
                )}

                {showSuccessMessage && (
                  <div className="space-y-6 mt-8">
                    <div>
                      <label htmlFor="codePrompt" className="block text-lg font-medium text-gray-700 mb-3">
                        Customize Code Generation
                      </label>
                      <textarea
                        id="codePrompt"
                        value={codePrompt}
                        onChange={(e) => setCodePrompt(e.target.value)}
                        className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        rows={3}
                        placeholder="Enter specific instructions for code generation..."
                      />
                    </div>
                    <button 
                      onClick={SendImage} 
                      disabled={codeLoading || !selectedImage}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {codeLoading ? 'Generating Code...' : 'Generate Code from Design'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Webllix;

///its displaying iamge id and sending to openia generatign code bas ehtisiamge sometime work sometime not  but difretn image id   and not dispalying iamg in code with white 