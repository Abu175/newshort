'use client'
import React from 'react';

const CodePreview: React.FC = () => {
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
       <article class="bg-white">
          <!-- Content goes here, as per your HTML code -->
       </article>
    </body>
    </html>
  `;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlCode }}
    />
  );
};

export default CodePreview;
