import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <article className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 max-w-6xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Design Your Game Website Instantly
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
          Discover how to use AI to create a game website in seconds with WebLLix. Get a design that's as captivating as your game.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started for Free
        </a>
      </header>

      {/* What is AI Web Design Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            What is AI Web Design?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <p className="text-xl mb-6 text-gray-700">
                AI web design leverages artificial intelligence to automatically generate website designs tailored to your needs, including:
              </p>
              <ul className="space-y-4">
                {["Automated, award-winning designs", "Custom layouts and styles", "Optimized user experience for all devices", "Instant updates and adjustments"].map((text) => (
                  <li className="flex items-center" key={text}>
                    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img
                src="/profile.png"
                alt="AI Web Design Concept"
                className="rounded-lg shadow-2xl w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Generate Code Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Generate Code for Responsive Website
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  After AI designs your website, you can also generate code for a fully responsive site.
                </p>
                <a
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full shadow hover:bg-gray-100 transition text-lg font-semibold"
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/Aieditor.png"
                  alt="AI Code Generator"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <header className="mb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-12">
          <div className="mb-6">
            <span className="text-sm font-semibold bg-white text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
              AI & Technology
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Future of Web Design: How AI is Revolutionizing the Industry
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover how artificial intelligence is transforming web design and what it means for developers, designers, and businesses.
          </p>
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
            <img
              src="/emily-avatar.jpg"
              alt="Emily Chen"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
            <div>
              <p className="font-semibold">Emily Chen</p>
              <p className="text-sm text-blue-100">May 15, 2023 • 15 min read</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="/hero-image.jpg"
            alt="AI Web Design"
            className="w-full h-full object-cover"
            style={{
              clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </div>
    </header>
    <div>
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-60"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
        />
        <div className="z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">The Future of Web Design</h1>
          <p className="text-2xl text-blue-100">How AI is Revolutionizing the Industry</p>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 -mt-40">
          <aside className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="/emily-avatar.jpg"
                alt="Emily Chen"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">Emily Chen</h3>
                <p className="text-sm text-gray-500">May 15, 2023 • 15 min read</p>
              </div>
            </div>
            <nav>
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                <li><a href="#introduction" className="text-blue-600 hover:underline">Introduction</a></li>
                <li><a href="#what-is-ai-web-design" className="text-blue-600 hover:underline">What is AI Web Design?</a></li>
                <li><a href="#benefits" className="text-blue-600 hover:underline">Benefits of AI in Web Design</a></li>
                <li><a href="#challenges" className="text-blue-600 hover:underline">Challenges and Limitations</a></li>
                <li><a href="#future" className="text-blue-600 hover:underline">The Future of AI Web Design</a></li>
                <li><a href="#conclusion" className="text-blue-600 hover:underline">Conclusion</a></li>
              </ul>
            </nav>
          </aside>

          <main className="bg-white p-6 rounded-lg shadow-md md:col-span-3">
            <section id="introduction" className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Introduction</h2>
              <p>
                The web design industry is on the brink of a major transformation.
                Artificial Intelligence (AI) is no longer a futuristic concept but a present reality that's reshaping
                how we approach web design.
              </p>
            </section>

            <section id="conclusion" className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Conclusion</h2>
              <p>
                As we stand on the cusp of this AI revolution in web design,
                it's clear that the future holds immense potential.
                Embracing these changes will be key to staying ahead in the industry.
              </p>
            </section>
          </main>
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated on AI and Web Design</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest insights and trends.</p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 rounded-r-lg hover:bg-gray-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
    <header className="mb-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-3xl"></div>
      <div className="relative z-10 p-8">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-6">
          AI &amp; Technology
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          The Future of Web Design: AI Revolution
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl">
          Discover how artificial intelligence is transforming web design and what it means for developers, designers, and businesses.
        </p>
        <div className="flex items-center space-x-4">
          <img
            src="/emily-avatar.jpg"
            alt="Emily Chen"
            className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
          />
          <div>
            <p className="font-semibold text-gray-900">Emily Chen</p>
            <p className="text-sm text-gray-600">May 15, 2023 • 15 min read</p>
          </div>
        </div>
      </div>
    </header>
      {/* CTA Section */}
      
    </article>
  );
};

export default LandingPage;
