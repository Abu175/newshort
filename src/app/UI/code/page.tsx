'use client'
import React, { useState } from 'react';

const CodePreview: React.FC = () => {
  // Define the HTML code as a constant
  const htmlCode = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gethectier</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #FFC0CB; /* Light pink background */
            }
        </style>
    </head>
    <body class="bg-pink-200">
        <header class="container mx-auto p-4 bg-pink-300">
            <nav class="flex justify-between items-center">
                <div class="text-2xl font-bold text-gray-800">Gethectier</div>
                <ul class="flex space-x-4 text-gray-800">
                    <li><a href="#" class="hover:text-gray-900">Home</a></li>
                    <li><a href="#" class="hover:text-gray-900">Printing</a></li>
                    <li><a href="#" class="hover:text-gray-900">Letters</a></li>
                    <li><a href="#" class="hover:text-gray-900">Cuts</a></li>
                    <li><a href="#" class="hover:text-gray-900">Tings</a></li>
                    <li><a href="#" class="bg-white px-4 py-2 rounded text-gray-800 hover:bg-gray-100">Send</a></li>
                </ul>
            </nav>
        </header>

        <main class="container mx-auto p-4 bg-pink-100">
            <h1 class="text-4xl font-bold mb-2 text-gray-800">Welcome to Gethectier</h1>
            <h2 class="text-3xl font-semibold mb-4 text-gray-700">Innovating with Cutting-Edge Solutions</h2>
            <p class="mb-8 text-gray-600">Discover our range of services designed to streamline your workflow and enhance productivity.</p>

            <div class="flex bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="w-1/2 bg-blue-400 p-8">
                    <p class="text-white mb-4">Experience seamless integration and powerful features tailored to your needs. Our solutions offer exceptional value and are designed to make your tasks easier and more efficient.</p>
                    <button class="bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-400">Get Started</button>
                </div>
                <div class="w-1/2 bg-pink-400 p-8 flex items-center justify-center">
                    <div class="bg-white p-4 rounded shadow-md">
                        <h3 class="font-bold mb-2 text-gray-800">Features</h3>
                        <ul class="text-gray-600">
                            <li>✓ User-Friendly Interface</li>
                            <li>✓ Advanced Analytics</li>
                            <li>✓ Reliable Support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>

        <footer class="container mx-auto p-4 mt-8 bg-pink-300">
            
        </footer>
    </body>
    </html>
  `;

  const [view, setView] = useState<'code' | 'preview'>('preview');

  return (
    <div className="flex flex-col h-full">
      {/* View Toggle Buttons */}
      <div className="mb-4">
        <button
          className={`p-2 mr-2 ${view === 'code' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('code')}
        >
          Code
        </button>
        <button
          className={`p-2 ${view === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('preview')}
        >
          Preview
        </button>
      </div>

      {/* Conditional Rendering */}
      {view === 'code' ? (
        <pre className="border p-4 w-full h-60 overflow-auto">
          <code>{htmlCode}</code>
        </pre>
      ) : (
        <iframe
          srcDoc={htmlCode}
          className="border p-4 w-full h-[calc(100vh-8rem)]" // Adjust height to fit the view
          title="HTML Preview"
        />
      )}
    </div>
  );
};

export default CodePreview;
