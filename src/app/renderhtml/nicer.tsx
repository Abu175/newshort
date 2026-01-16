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
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Web Design Revolution</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #00ffff;
            --secondary-color: #ff00ff;
            --background-color: #0a0a0a;
            --text-color: #ffffff;
            --accent-color: #ffff00;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        header {
            position: fixed;
            width: 100%;
            z-index: 1000;
            padding: 1rem 0;
            background: rgba(10, 10, 10, 0.8);
            backdrop-filter: blur(10px);
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            text-transform: uppercase;
            letter-spacing: 2px;
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
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            text-align: center;
            z-index: 1;
        }

        .hero h1 {
            font-size: 5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.2;
            text-transform: uppercase;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 5s ease infinite;
            background-size: 200% 200%;
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-button {
            display: inline-block;
            background-color: var(--accent-color);
            color: var(--background-color);
            padding: 0.75rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cta-button:hover {
            background-color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2);
        }

        .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 20%, rgba(255, 0, 255, 0.2) 0%, transparent 20%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.2) 0%, transparent 20%);
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
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
        }

        .article-section {
            margin-bottom: 4rem;
        }

        .article-section h2 {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
            position: relative;
            display: inline-block;
        }

        .article-section h2::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        }

        .sidebar {
            position: sticky;
            top: 100px;
            height: fit-content;
        }

        .toc {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
        }

        .toc h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--secondary-color);
        }

        .toc ul {
            list-style-type: none;
        }

        .toc li {
            margin-bottom: 0.5rem;
            position: relative;
            padding-left: 20px;
        }

        .toc li::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: var(--accent-color);
        }

        .toc a {
            color: var(--text-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .toc a:hover {
            color: var(--primary-color);
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
            border-radius: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
                from 0deg at 50% 50%,
                var(--primary-color) 0deg,
                transparent 60deg,
                transparent 300deg,
                var(--secondary-color) 360deg
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }

        .feature-card:hover::before {
            opacity: 0.1;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 255, 255, 0.1);
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

            .hero h1 {
                font-size: 3rem;
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
            <h1>AI Web Design Revolution</h1>
            <p>Experience the future of web design with AI-powered creativity and efficiency.</p>
            <a href="#" class="cta-button">Explore Now</a>
        </div>
        <div class="hero-bg"></div>
    </section>

    <div class="container content">
        <main class="main-content">
            <article>
                <section class="article-section">
                    <h2>The AI Revolution</h2>
                    <p>Artificial Intelligence is reshaping the web design landscape, offering unprecedented possibilities for creativity and efficiency. From automated layouts to personalized user experiences, AI is transforming how we approach digital design.</p>
                </section>

                <section class="article-section">
                    <h2>Key Features</h2>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <div class="feature-icon">🎨</div>
                            <h3>Intelligent Design Generation</h3>
                            <p>AI algorithms create unique layouts tailored to your content and brand.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🔍</div>
                            <h3>Smart Content Analysis</h3>
                            <p>AI analyzes your content to suggest optimal structures and hierarchies.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🚀</div>
                            <h3>Performance Optimization</h3>
                            <p>AI-driven tools automatically optimize your site for speed and efficiency.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">👤</div>
                            <h3>Personalized User Experience</h3>
                            <p>AI adapts your site's layout and content based on individual user behavior.</p>
                        </div>
                    </div>
                </section>

                <!-- Add more sections here -->

            </article>
        </main>

        <aside class="sidebar">
            <div class="toc">
                <h3>Quick Navigation</h3>
                <ul>
                    <li><a href="#revolution">The AI Revolution</a></li>
                    <li><a href="#features">Key Features</a></li>
                    <li><a href="#benefits">Benefits</a></li>
                    <li><a href="#case-studies">Case Studies</a></li>
                    <li><a href="#future">The Future of AI Design</a></li>
                </ul>
            </div>
        </aside>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2023 AI Web Design Revolution. Embracing the future of digital creativity.</p>
        </div>
    </footer>

    <script>
        // Add scroll reveal animation
        window.addEventListener('scroll', reveal);

        function reveal() {
            var reveals = document.querySelectorAll('.article-section, .feature-card');

            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var revealTop = reveals[i].getBoundingClientRect().top;
                var revealPoint = 150;

                if (revealTop < windowHeight - revealPoint) {
                    reveals[i].classList.add('active');
                } else {
                    reveals[i].classList.remove('active');
                }
            }
        }
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
