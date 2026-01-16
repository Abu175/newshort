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
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        header {
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .nav-links a {
            color: var(--secondary-color);
            text-decoration: none;
            margin-left: 2rem;
            font-weight: 500;
        }

        .hero {
            height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: #fff;
            margin-top: 60px;
        }

        .hero-content {
            max-width: 600px;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }

        .hero p {
            font-size: 1.25rem;
            color: var(--secondary-color);
            margin-bottom: 2rem;
        }

        .cta-button {
            display: inline-block;
            background-color: var(--accent-color);
            color: #fff;
            padding: 0.75rem 2rem;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: #2C5282;
        }

        .content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 4rem;
            margin-top: 4rem;
        }

        .main-content {
            background-color: #fff;
            padding: 2rem;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .article-section {
            margin-bottom: 3rem;
        }

        .article-section h2 {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 0.5rem;
        }

        .sidebar {
            background-color: #fff;
            padding: 2rem;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            height: fit-content;
        }

        .sidebar h3 {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .sidebar ul {
            list-style-type: none;
        }

        .sidebar li {
            margin-bottom: 0.5rem;
        }

        .sidebar a {
            color: var(--secondary-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .sidebar a:hover {
            color: var(--accent-color);
        }

        @media (max-width: 768px) {
            .content {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">AI Design</div>
                <div class="nav-links">
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>AI in Web Design</h1>
            <p>Exploring the intersection of artificial intelligence and web design</p>
            <a href="#" class="cta-button">Learn More</a>
        </div>
    </section>

    <div class="container content">
        <main class="main-content">
            <article>
                <section class="article-section">
                    <h2>Introduction</h2>
                    <p>Artificial Intelligence is revolutionizing the web design industry, offering new possibilities for creativity and efficiency. From automated layouts to personalized user experiences, AI is changing how we approach digital design.</p>
                </section>

                <section class="article-section">
                    <h2>Key Features of AI in Web Design</h2>
                    <ul>
                        <li>Automated layout generation</li>
                        <li>Intelligent content analysis and organization</li>
                        <li>Personalized user experiences</li>
                        <li>Advanced A/B testing and optimization</li>
                    </ul>
                </section>

                <section class="article-section">
                    <h2>Benefits of AI-Powered Web Design</h2>
                    <p>AI offers numerous advantages in web design, including increased efficiency, data-driven decision making, and enhanced user experiences. By leveraging machine learning algorithms, designers can create more effective and engaging websites.</p>
                </section>
                 <main class="main-content">
            <article>
                <section class="article-section">
                    <h2>Introduction</h2>
                    <p>Artificial Intelligence is revolutionizing the web design industry, offering new possibilities for creativity and efficiency. From automated layouts to personalized user experiences, AI is changing how we approach digital design.</p>
                </section>

                <section class="article-section">
                    <h2>Key Features of AI in Web Design</h2>
                    <ul>
                        <li>Automated layout generation</li>
                        <li>Intelligent content analysis and organization</li>
                        <li>Personalized user experiences</li>
                        <li>Advanced A/B testing and optimization</li>
                    </ul>
                </section>

                <section class="article-section">
                    <h2>Benefits of AI-Powered Web Design</h2>
                    <p>AI offers numerous advantages in web design, including increased efficiency, data-driven decision making, and enhanced user experiences. By leveraging machine learning algorithms, designers can create more effective and engaging websites.</p>
                </section>

                <!-- Add more sections as needed -->

            </article>
        </main>

                <!-- Add more sections as needed -->

            </article>
        </main>

        <aside class="sidebar">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#key-features">Key Features</a></li>
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#case-studies">Case Studies</a></li>
                <li><a href="#future">Future of AI in Web Design</a></li>
            </ul>
        </aside>
    </div>
</body>
</html>

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
