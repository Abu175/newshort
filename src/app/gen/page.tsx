'use client'

import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Meta Tags */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Kynn - Ceramic and Artwork Store" />
        <title>Kynn Ceramic & Artwork</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center" style={{ backgroundColor: 'rgb(186, 83, 234)' }}>
        <div className="text-2xl font-bold">Koe</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-orange-500">Home</a>
          <a href="#" className="hover:text-orange-500">Shop</a>
          <a href="#" className="hover:text-orange-500">About</a>
          <a href="#" className="hover:text-orange-500">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-4">Interior Design Studio</h1>
            <p className="mb-6">
              Discover unique interior designs tailored to your style. Our studio blends modern aesthetics with comfort and functionality.
            </p>
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">Learn More</a>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 grid grid-cols-2 gap-4">
            <img src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Interior Design Image 1" className="rounded-lg shadow-lg" />
            <img src="https://images.pexels.com/photos/6316065/pexels-photo-6316065.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Interior Design Image 2" className="rounded-lg shadow-lg" />
            <img src="https://images.pexels.com/photos/713054/pexels-photo-713054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Interior Design Image 3" className="rounded-lg shadow-lg" />
            <img src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Interior Design Image 4" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">About Kynn</h2>
          <p className="max-w-3xl mx-auto mb-8 text-lg">
            At Kynn, we merge the time-honored art of traditional ceramic hand-building with the latest in 3D printing technology. Our expertly crafted products are more than just functional – they are expressions of artistry designed to elevate your space.
          </p>
          <a href="#" className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg">Learn More</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2024 Koe Ceramics & Artwork. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
