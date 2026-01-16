import React from 'react';

const AIWebDesign: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hexagonal Hero Section */}
        <header className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="hexagon bg-blue-600 aspect-square flex items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-center">AI Web Design</h1>
          </div>
          <div className="hexagon bg-purple-600 aspect-square flex items-center justify-center p-8">
            <p className="text-xl text-center">The Future Unfolds</p>
          </div>
          <div className="hexagon bg-pink-600 aspect-square flex items-center justify-center p-8">
            <img src="/emily-avatar.jpg" alt="Emily Chen" className="rounded-full w-24 h-24" />
          </div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Introduction */}
          <section className="col-span-1 md:col-span-4 bg-gray-900 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Introduction</h2>
            <p className="text-lg mb-6">
              The web design landscape is undergoing a seismic shift. Artificial Intelligence, once a distant dream, now stands at the forefront of digital creation.
            </p>
            <img src="/ai-web-design-intro.jpg" alt="AI Web Design Concept" className="w-full rounded-xl" />
          </section>

          {/* Key Points */}
          <aside className="col-span-1 md:col-span-2 space-y-8">
            <div className="bg-blue-900 p-6 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>AI revolutionizes design processes</li>
                <li>Enhanced personalization</li>
                <li>Ethical considerations</li>
              </ul>
            </div>
            <div className="bg-purple-900 p-6 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <p className="text-3xl font-bold">73%</p>
              <p>of designers use AI tools</p>
            </div>
          </aside>

          {/* AI Revolution */}
          <section className="col-span-1 md:col-span-3 bg-gray-900 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">AI Revolution</h2>
            <p className="text-lg">
              AI is reshaping how we approach web design, from automated layouts to intelligent user experience optimization.
            </p>
          </section>

          {/* Interactive Demo */}
          <section className="col-span-1 md:col-span-3 bg-gradient-to-br from-blue-800 to-purple-800 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Experience AI Design</h2>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe src="https://ai-design-demo.com" className="w-full h-full rounded-xl" title="AI Design Demo" />
            </div>
            <button className="w-full bg-white text-blue-800 font-bold py-3 rounded-full hover:bg-blue-100 transition duration-300">
              Try It Now
            </button>
          </section>

          {/* Benefits and Challenges */}
          <section className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-900 p-6 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Increased efficiency</li>
                <li>Data-driven designs</li>
                <li>Scalable solutions</li>
              </ul>
            </div>
            <div className="bg-red-900 p-6 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Challenges</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Creative limitations</li>
                <li>Ethical concerns</li>
                <li>Job displacement fears</li>
              </ul>
            </div>
          </section>

          {/* Author Bio */}
          <aside className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-3xl">
            <img src="/emily-avatar.jpg" alt="Emily Chen" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">Emily Chen</h3>
            <p className="text-center text-sm">
              AI Design Pioneer & Futurist with over a decade of experience in cutting-edge web technologies.
            </p>
          </aside>

          {/* Future Outlook */}
          <section className="col-span-1 md:col-span-6 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center">The Future of AI in Web Design</h2>
            <p className="text-lg text-center mb-8">
              As AI continues to evolve, we can expect even more revolutionary changes in how websites are designed and experienced.
            </p>
            <div className="flex justify-center">
              <a href="#" className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300">
                Explore More
              </a>
            </div>
          </section>
        </main>

        {/* Newsletter Signup */}
        <section className="mt-32 bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Join the AI Design Revolution</h2>
          <p className="text-xl mb-8">Stay ahead with our cutting-edge insights and tutorials.</p>
          <form className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-6 py-3 rounded-l-full bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="bg-white text-blue-600 px-8 py-3 rounded-r-full font-bold hover:bg-blue-100 transition duration-300">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AIWebDesign;
