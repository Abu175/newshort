import { Sparkles, FileText, Image as ImageIcon, Edit } from "lucide-react"; // Importing additional icons
import React from "react";
import { FaCogs, FaPalette, FaLaptop, FaMobileAlt, FaRocket } from "react-icons/fa"; // Using Font Awesome icons

const ServicesSection = () => {
  return (
    <div className="bg-gray-100">
      {/* Main Section */}
      <section className="bg-white py-12 shadow-lg rounded-lg">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
          <div className="grid grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Icon 1: Drag and Drop */}
            <div className="flex flex-col items-center">
              <FaCogs className="h-12 w-12 text-blue-600 transition-transform transform hover:scale-110" />
              <h3 className="text-xl font-semibold mt-2">Drag and Drop</h3>
              <p className="text-gray-400 text-sm text-center">
                Personalize every detail with AI-powered controls.
              </p>
            </div>

            {/* Icon 2: Color */}
            <div className="flex flex-col items-center">
              <FaPalette className="h-12 w-12 text-teal-500 transition-transform transform hover:scale-110" />
              <h3 className="text-xl font-semibold mt-2">Color Customization</h3>
              <p className="text-gray-400 text-sm text-center">
                Choose from a vibrant palette to make your site stand out.
              </p>
            </div>

            {/* Icon 3: Desktop Ready */}
            <div className="flex flex-col items-center">
              <FaLaptop className="h-12 w-12 text-green-500 transition-transform transform hover:scale-110" />
              <h3 className="text-xl font-semibold mt-2">Desktop Ready</h3>
              <p className="text-gray-400 text-sm text-center">
                Seamless desktop experience with pixel-perfect designs.
              </p>
            </div>

            {/* Icon 4: Mobile Friendly */}
            <div className="flex flex-col items-center">
              <FaMobileAlt className="h-12 w-12 text-purple-500 transition-transform transform hover:scale-110" />
              <h3 className="text-xl font-semibold mt-2">Mobile Friendly</h3>
              <p className="text-gray-400 text-sm text-center">
                Ensure your website looks perfect on all mobile devices.
              </p>
            </div>

            {/* Icon 5: Fast Performance */}
            <div className="flex flex-col items-center">
              <FaRocket className="h-12 w-12 text-yellow-500 transition-transform transform hover:scale-110" />
              <h3 className="text-xl font-semibold mt-2">Fast Performance</h3>
              <p className="text-gray-400 text-sm text-center">
                Lightning-fast loading times for an enhanced user experience.
              </p>
            </div>
          </div>

          {/* Left Text Section */}
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Turn Your Ideas Into Websites with AI
            </h1>
            <p className="text-gray-600 text-base sm:text-lg my-4">
              Experience seamless website creation by simply providing text prompts or screenshots. AI takes care of the rest.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Get Started
              </a>
              <a href="#" className="bg-white text-blue-700 border border-blue-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Our Portfolio
              </a>
            </div>

            {/* Additional Features */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
