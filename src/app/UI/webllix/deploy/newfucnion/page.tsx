"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';

const Webllix: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);
  const [imageGenerated, setImageGenerated] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageGenerated(false);
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
      formData.append('prompt', 'Generate UI HTML using Tailwind CSS based on this image.');

      const response = await fetch('/api/users/openaigpt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate code');
      }

      const data = await response.json();
      const generatedCode = data.result;

      const htmlCode = extractHtmlCode(generatedCode);

      setImageGenerated(true);

      setTimeout(() => {
        router.push(`/homepage/codeeditor?code=${encodeURIComponent(htmlCode)}`);
      }, 3000); // 3 second delay

    } catch (error) {
      console.error('Error generating code:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate code. Please try again.');
    } finally {
      setCodeLoading(false);
    }
  }, [selectedImage, router]);

  const extractHtmlCode = (result: string) => {
    const htmlMatch = result.match(/<html[\s\S]*<\/html>/i);
    return htmlMatch ? htmlMatch[0] : result;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!imageGenerated ? (
        <>
          <h1 className="text-3xl font-bold mb-8">Upload an Image</h1>
          <div className="mb-4">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Select Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          {selectedImage && (
            <div className="mb-4">
              <p className="text-green-600">Image selected: {selectedImage.name}</p>
            </div>
          )}
          <button
            onClick={SendImage}
            disabled={!selectedImage || codeLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {codeLoading ? 'Generating...' : 'Generate Code from Selected Image'}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-8 text-green-600">Your Image is Successful!</h2>
          <p className="text-xl mb-4">Code has been generated.</p>
          <p className="text-lg">Redirecting to code editor...</p>
        </div>
      )}
    </div>
  );
};

export default Webllix;

//it redirecting corectly  but you cna choose file and send genraet 