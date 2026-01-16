//webllix/page.tsx

"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Info } from "lucide-react";

import { useRouter as useRouterNavigation } from 'next/navigation'; // Import useRouter for navigation

const Webllix: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [incomingImages, setIncomingImages] = useState<string[]>([]);
  const [company, setCompany] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const router = useRouterNavigation(); // Initialize useRouter for navigation

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

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    if (!userId) {
      // Redirect to the signup page if userId is not present
      router.push('/signup');
      return;
    }

    setLoading(true); // Start loading

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
      setLoading(false); // Stop loading
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup'); // Redirect to the signup page
  };

  // Add this new state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Add this new function
  const handleSendImage = useCallback(async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/users/generate/new/pagegenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code from image');
      }

      const { code, codeType } = await response.json();
      
      // Encode the generated code and code type, and pass them as URL parameters
      const encodedCode = encodeURIComponent(code);
      router.push(`/homepage/codeeditor?code=${encodedCode}&codeType=${codeType}`);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : "Unknown error");
      alert("Failed to generate code from image. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedImage, router]);

  const handleImageSelect = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
  }, []);

  return (
    <div className="bg-gray-900 text-white flex h-screen p-10">
      <div className="flex-1 pr-8 overflow-hidden">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              {/* Placeholder for SettingsIcon */}
            </div>
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="prompt">
       
              </label>
              <textarea
                id="prompt"
                placeholder="Design a modern, visually appealing website for a tech startup that features a clean layout, bold typography, and a vibrant color palette. Include sections for services, about, and contact information, with a focus on user-friendly navigation and engaging visuals."
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
                      <p>Enter your company or store name (e.g.,Webllix ).</p>
                      <p> Ensure the name is correct to match with prompt for proper functionality </p>
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

            {/* Conditionally render the signup button if userId is not present */}
            
          </div>
        </div>
      </div>
      <div className="flex-1 pl-8 overflow-y-auto h-full">
        <div className="grid grid-cols-1 gap-8 overflow-y-auto max-h-full" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div> {/* Define your loader styles */}
            </div>
          ) : incomingImages && incomingImages.length > 0 ? (
            incomingImages.map((image, index) => (
              <div key={index} className="max-w-full">
                <Image
                  src={image}
                  alt={`Generated image ${index + 1}`}
                  width={600}
                  height={2024}
                  className={`w-full rounded-md cursor-pointer ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
                  onClick={() => handleImageSelect(image)}
                />
              </div>
            ))
          ) : (
            <p className="text-xl"></p>
          )}
        </div>
        {selectedImage && (
          <button 
            onClick={handleSendImage}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            Send to Code Generator
          </button>
        )}
      </div>
    </div>
  );
};

export default Webllix;
