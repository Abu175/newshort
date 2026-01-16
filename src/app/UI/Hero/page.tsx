'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Head from 'next/head';

const Hero: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="bg-gradient-to-r from-[#000000] to-[rgb(16,4,1)] hover:from-[#000000] hover:to-[#6b89ec]  p-8 w-auto mx-auto">
            <Head>
                <title>Webllix AI Website Design</title>
                <meta name="description" content="Design Custom Website with AI" />
                <meta name="keywords" content="AI Landing page, webllix, AI web design, web design company, web design agency, web design services, custom web design" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Webllix Generate AI Website" />
                <meta property="og:description" content="Design Smarter, Not Harder: AI-Powered Web Creation" />
                <meta property="og:image" content="https://www.webllix.com/" />
                <meta property="og:url" content="https://webllix.com/UI/landing-page" />
                <meta name="twitter:title" content="webllix || Design fast better with webllix" />
                <meta name="twitter:description" content="Transform Your Vision into Reality with High-Impact Website" />
                <meta name="twitter:image" content="https://webllix.com/2.png" />
                <link rel="canonical" href="https://www.webllix.com/" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  {/* Added viewport meta tag */}
            </Head>

            <header className="relative">
                <button
                    className="absolute top-4 right-4 md:hidden p-2 text-black"
                    onClick={toggleMenu}
                >
                    {menuOpen ? '✖️' : '☰'}
                </button>
                <nav className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:relative md:flex md:items-center md:justify-between md:bg-transparent md:bg-opacity-100`}>
                    <ul className="flex flex-col items-center md:flex-row md:space-x-6 mt-16 md:mt-0">
                        <li><a href="/" className="text-white text-xl p-4"></a>Home</li>
                        <li><a href="/blog" className="text-white text-xl p-4">Blog</a></li>
                        <li><a href="/login" className="text-white text-xl p-4">Login</a></li>
                        <li><a href="/pricing" className="text-white text-xl p-4">Pricing</a></li>
                    </ul>
                </nav>
            </header>

            <main className="   ">
                <section
                    id="top"
                    className="bg-gray-100 py-20 px-6 md:px-12 flex flex-col md:flex-row items-center rounded-3xl animate-gradient"
                >
                    <div className="relative md:w-1/2 w-full h-96 p-6 bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Left Side Images */}
                        <Image
                            src="/game.png"
                            alt="A game design"
                            width={250}
                            height={250}
                            className="absolute top-0 left-0 rounded-xl transform rotate-[-30deg] shadow-2xl z-40 transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                        />
                        <Image
                            src="/carr.png"
                            alt="A game design"
                            width={250}
                            height={250}
                            className="absolute top-4 left-4 rounded-xl transform rotate-[-20deg] shadow-2xl z-30 transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                        />

                        <Image
                            src="/ecommerce.png"
                            alt="A game design"
                            width={250}
                            height={250}
                            className="absolute top-12 left-12 rounded-xl transform rotate-[0deg] shadow-2xl z-10 transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                        />

                        {/* Right Side Images */}
                        <Image
                            src="/archit.png"
                            alt="A game design"
                            width={250}
                            height={250}
                            className="absolute top-0 right-0 rounded-xl transform rotate-[30deg] shadow-2xl z-40 transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                        />
                        <Image
                            src="/cosmetic.png"
                            alt="A game design"
                            width={250}
                            height={250}
                            className="absolute top-4 right-4 rounded-xl transform rotate-[20deg] shadow-2xl z-30 transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                        />
                        <Image
                            src="/education.png"
                            alt="A game design"
                            width={250}
                            height={250}
                            className="absolute top-8 right-8 rounded-xl transform rotate-[10deg] shadow-2xl z-20 transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                        />

                    </div>


                    <div className="md:w-1/2 w-full mt-8 md:mt-0 text-black">
                        <h1 className="text-4xl md:text-2xl font-extrabold mb-4 text-center md:text-left">
                            AI-Powered Web Design, Building Smarter, Faster, Better
                        </h1>
                        <p className="text-lg mb-6 text-center md:text-left">
                            Transform your digital strategy with AI-enhanced web and landing page design. Deliver personalized, high-impact experiences that resonate with your audience and drive engagement.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/login'}
                                className="text-white bg-gradient-to-r from-[#110501] to-[#FF6347] hover:from-[#FF6347] hover:to-[#6b80ec] shadow-lg hover:shadow-xl font-extralight rounded-full text-lg px-12 py-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                            >
                                Try Webllix For Free
                            </button>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-pink-500 to-orange-500 max-w-8xl mx-auto sm:w-8/9 md:w-7/5 lg:w-3/4 h-[800px] rounded-3xl p-6 mt-10">
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                        <div className="rounded-md shadow"></div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-10 items-center justify-between">
                        <div className="md:w-1/2 w-full">
                            <h1 className="text-4xl md:text-2xl font-extrabold mb-4 text-center md:text-left">
                                Transform Your Vision into Reality with High-Impact Website
                            </h1>
                            <p className="text-lg mb-6 text-center md:text-left">
                                Boost your web design projects with stunning, responsive templates. Perfect for creating visually captivating websites that engage your audience and deliver results.
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <button
                                    type="button"
                                    onClick={() => window.location.href = '/login'}
                                    className="text-black bg-white hover:bg-gradient-to-bl font-bold rounded-full text-lg px-12 py-4 text-center"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div className="relative max-w-sm bg-purple-900 p-8 rounded-xl shadow-lg transform rotate-3 translate-x-10 mx-auto md:mx-0 md:ml-8 mt-10 md:mt-0">
                            <div className="relative flex items-center justify-center w-full h-64 rounded-full shadow-lg overflow-hidden">
                                <div className="w-auto">
                                    <Image
                                        src="/noah.png"
                                        alt="Boy"
                                        width={500}
                                        height={300}
                                        className="rounded-full w-auto h-auto shadow-lg"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 text-center">

                                <p className="text-gray-300">
                                    Clean, intuitive design that truly reflects my brand. The process was seamless, and the results are outstanding.
                                </p>
                            </div>
                            <div className="flex justify-center mt-6">
                                <a href="/signup" className="bg-yellow-500 text-white px-6 py-3 rounded-full mr-4 hover:bg-yellow-600 transition duration-200">
                                    Get Started
                                </a>
                                <a href="/UI/gallery/landing-page" className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-black transition duration-200">
                                    COLLECTIONS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Hero;
