'use client'
import React from 'react';

const CodePreview: React.FC = () => {
  const htmlCode = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    


    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Future of Web Design: AI Revolution</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&amp;display=swap" rel="stylesheet">
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI in Web Design</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2D3748;
            --secondary-color: #4A5568;
            --accent-color: #3182CE;
            --background-color: #F7FAFC;
            --text-color: #1A202C;
            --highlight-color: #E2E8F0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            scroll-behavior: smooth;
        }

        header {
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            padding: 1rem 2rem;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .nav-links a {
            color: var(--secondary-color);
            text-decoration: none;
            margin-left: 1.5rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--accent-color);
        }

        .hero {
            height: 85vh;
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-align: center;
            background: linear-gradient(135deg, #3182CE, #2D3748);
            color: white;
            padding: 2rem;
            position: relative;
        }

        .hero-content h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .hero-content p {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
        }

        .cta-button {
            background-color: var(--highlight-color);
            color: var(--primary-color);
            padding: 0.75rem 2rem;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: #B2C8DF;
        }

        .content {
            display: flex;
            flex-wrap: wrap;
            margin: 3rem 0;
            gap: 2rem;
            padding: 0 2rem;
        }

        .article-section {
            flex: 2;
            background-color: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .article-section h2 {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
            position: relative;
        }

        .article-section h2::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -8px;
            width: 60px;
            height: 3px;
            background-color: var(--accent-color);
        }

        .article-section p,
        .article-section ul {
            margin-bottom: 1.5rem;
        }

        .sidebar {
            flex: 1;
            background-color: var(--highlight-color);
            padding: 2rem;
            border-radius: 8px;
            height: fit-content;
        }

        .sidebar h3 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }

        .sidebar ul {
            list-style: none;
        }

        .sidebar li {
            margin-bottom: 0.75rem;
        }

        .sidebar a {
            color: var(--secondary-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .sidebar a:hover {
            color: var(--accent-color);
        }

        footer {
            text-align: center;
            padding: 1.5rem 0;
            background-color: var(--secondary-color);
            color: white;
            margin-top: 2rem;
        }

        @media (max-width: 768px) {
            .content {
                flex-direction: column;
            }

            .hero {
                flex-direction: column;
            }
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <div class="logo">AI Design</div>
            <div class="nav-links">
                <a href="#about">About</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>AI in Web Design</h1>
            <p>Exploring the intersection of artificial intelligence and web design</p>
            <a href="#" class="cta-button">Learn More</a>
        </div>
    </section>

    <div class="content">
        <article class="article-section">
            <h2 id="introduction">Introduction</h2>
            <p>Artificial Intelligence is revolutionizing the web design industry, offering new possibilities for creativity and efficiency. From automated layouts to personalized user experiences, AI is changing how we approach digital design.</p>
        </article>

        <article class="article-section">
            <h2 id="key-features">Key Features of AI in Web Design</h2>
            <ul>
                <li>Automated layout generation</li>
                <li>Intelligent content analysis and organization</li>
                <li>Personalized user experiences</li>
                <li>Advanced A/B testing and optimization</li>
            </ul>
        </article>

        <article class="article-section">
            <h2 id="benefits">Benefits of AI-Powered Web Design</h2>
            <p>AI offers numerous advantages in web design, including increased efficiency, data-driven decision making, and enhanced user experiences. By leveraging machine learning algorithms, designers can create more effective and engaging websites.</p>
        </article>

        <aside class="sidebar">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#key-features">Key Features</a></li>
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#case-studies">Case Studies</a></li>
                <li><a href="#future">Future of AI</a></li>
            </ul>
        </aside>
    </div>

    <footer>
        &copy; 2024 AI Design. All rights reserved.
    </footer>
</body>

</html>
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
