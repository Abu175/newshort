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
    <title>AI Revolution in Web Design</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #6200EA;
            --secondary-color: #03DAC6;
            --background-color: #121212;
            --text-color: #E0E0E0;
            --accent-color: #BB86FC;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        header {
            padding: 2rem 0;
            position: fixed;
            width: 100%;
            z-index: 1000;
            transition: background-color 0.3s ease;
        }

        header.scrolled {
            background-color: rgba(18, 18, 18, 0.9);
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--secondary-color);
        }

        .nav-links a {
            color: var(--text-color);
            text-decoration: none;
            margin-left: 2rem;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--accent-color);
        }

        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            max-width: 600px;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
        }

        .cta-button {
            display: inline-block;
            background-color: var(--primary-color);
            color: #fff;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: var(--accent-color);
        }

        .hero-bg {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
            z-index: -1;
        }

        .content {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 4rem;
            margin-top: 4rem;
        }

        .main-content {
            padding: 2rem;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        .article-section {
            margin-bottom: 4rem;
        }

        .article-section h2 {
            font-size: 2.5rem;
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }

        .sidebar {
            position: sticky;
            top: 100px;
            height: fit-content;
        }

        .toc {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 10px;
        }

        .toc h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }

        .toc ul {
            list-style-type: none;
        }

        .toc li {
            margin-bottom: 0.5rem;
        }

        .toc a {
            color: var(--text-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .toc a:hover {
            color: var(--secondary-color);
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .feature-card {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 10px;
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }

        footer {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 4rem 0;
            margin-top: 4rem;
            text-align: center;
        }

        @media (max-width: 768px) {
            .content {
                grid-template-columns: 1fr;
            }

            .hero-bg {
                width: 100%;
                clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
            }

            .hero-content {
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">AI Web Design</div>
                <div class="nav-links">
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>The AI Revolution in Web Design</h1>
                <p>Discover how artificial intelligence is transforming the way we create and interact with websites.</p>
                <a href="#" class="cta-button">Learn More</a>
            </div>
        </div>
        <div class="hero-bg"></div>
    </section>

    <div class="container content">
        <main class="main-content">
            <article>
                <section class="article-section">
                    <h2>Introduction</h2>
                    <p>The web design industry is experiencing a seismic shift with the integration of Artificial Intelligence (AI). This revolutionary technology is not just a futuristic concept but a present reality that's reshaping how we approach web design. From automating routine tasks to generating entire layouts, AI is proving to be a game-changer in the field.</p>
                </section>

                <section class="article-section">
                    <h2>What is AI Web Design?</h2>
                    <p>AI web design refers to the use of artificial intelligence technologies to automate and enhance various aspects of the web design process. This includes leveraging machine learning, natural language processing, computer vision, and predictive analytics to create more efficient and effective web designs.</p>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <div class="feature-icon">🧠</div>
                            <h3>Machine Learning</h3>
                            <p>Algorithms that learn and improve from experience</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💬</div>
                            <h3>Natural Language Processing</h3>
                            <p>AI understanding and generating human language</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">👁️</div>
                            <h3>Computer Vision</h3>
                            <p>AI interpreting and understanding visual information</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📊</div>
                            <h3>Predictive Analytics</h3>
                            <p>Using data to predict future trends and behaviors</p>
                        </div>
                    </div>
                </section>

                <!-- Add more sections here -->

            </article>
        </main>

        <aside class="sidebar">
            <div class="toc">
                <h3>Table of Contents</h3>
                <ul>
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#what-is-ai-web-design">What is AI Web Design?</a></li>
                    <li><a href="#benefits">Benefits of AI in Web Design</a></li>
                    <li><a href="#challenges">Challenges and Limitations</a></li>
                    <li><a href="#future">The Future of AI Web Design</a></li>
                    <li><a href="#conclusion">Conclusion</a></li>
                </ul>
            </div>
        </aside>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2023 AI Web Design. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Add scroll effect to header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    </script>
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
