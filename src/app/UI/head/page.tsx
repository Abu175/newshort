'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Github, User, Briefcase } from 'lucide-react';
import Code from "@/app/UI/code/page"






const Section = () => {



    return (
        <div className="min-h-screen  bg-white">



            <main className="container   mx-auto px-6 py-16 ">
                <section className="text-center bg-gray-800 mb-16  water-drop-animation rounding rounded-md ">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="rotate-wrapper">
                            <Link href="/UI/gallery/landing-page" className="block bg-dark-500 shadow-md rounded-lg p-6 scroll-up rounding rotate-on-hover">
                                <Image
                                    src="/archo.png"
                                    alt="arch design"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-white mt-2">Arch</h3>
                                <p className="text-white mt-2"></p>
                            </Link>
                        </div>
                        <div className="rotate-wrapper">
                            <Link href="/UI/gallery/landing-page" className="block bg-dark-500 shadow-md rounded-lg p-6 scroll-up rounding rotate-on-hover">
                                <Image
                                    src="/game.png"
                                    alt="game web design"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-white mt-2">Game</h3>
                                <p className="text-white mt-2"></p>
                            </Link>
                        </div>
                        <div className="rotate-wrapper">
                            <Link href="/UI/gallery/landing-page" className="block bg-dark-500 shadow-md rounded-lg p-6 scroll-up rounding rotate-on-hover">
                                <Image
                                    src="/carr.png"
                                    alt="car web"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-white mt-2">Car Selling</h3>
                                <p className="text-white mt-2"></p>
                            </Link>
                        </div>
                        <div className="rotate-wrapper">
                            <Link href="/UI/gallery/landing-page" className="block bg-dark-500 shadow-md rounded-lg p-6 scroll-up rounding rotate-on-hover">
                                <Image
                                    src="/cosmo.png"
                                    alt="cosmetic design"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-white mt-2">Cosmetic</h3>
                                <p className="text-gray-600 mt-2"> </p>
                            </Link>
                        </div>
                        <div className="rotate-wrapper">
                            <Link href="/UI/gallery/landing-page" className="block bg-dark-500 shadow-md rounded-lg p-6 scroll-up rounding rotate-on-hover">
                                <Image
                                    src="/saas.png"
                                    alt="saas design"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-white mt-2">Academy</h3>
                                <p className="text-gray-600 mt-2"></p>
                            </Link>
                        </div>
                        <div className="rotate-wrapper">
                            <Link href="/UI/gallery/landing-page" className="block bg-dark-500 shadow-md rounded-lg p-6 scroll-up rounding rotate-on-hover">
                                <Image
                                    src="/a3.png"
                                    alt="education"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-white mt-2">Hotel</h3>
                                <p className="text-gray-600 mt-2"></p>
                            </Link>
                        </div>

                    </div>
                    <div className="car-collection flex flex-wrap justify-center mt-6">

                    </div>



                    <div className="car-collection flex flex-wrap justify-center mt-6">

                    </div>
                    <div className="car-collection flex flex-wrap justify-center mt-6">

                    </div>



                    <section className="my-12">
                        <div className="my-4" style={{ position: 'relative' }}>

                        </div>
                        <h2 className="text-3xl font-bold text-center text-customPurple">Features</h2>

                    </section>
                </section>
                <div className="bg-gradient-to-r from-blue-500 to-purple-700 p-9 rounded-lg mb-16">
                    <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-4 flex justify-between items-center">
                        <div>

                            <p className="text-sm text-gray-300">Coming soon..</p>
                            <p className="text-sm text-gray-300"></p>
                        </div>
                        <h2 className="text-lg font-semibold text-white">Get</h2>
                        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300">
                            code
                        </button>
                        <section className="flex-1 mt-4 mb-16 water-drop-animation">
                            <div className="w-full h-full">
                                <Code />
                            </div>
                        </section>
                    </div>
                </div>





                <section className="flex flex-col sm:flex-row items-center justify-center mt-4 mb-16 water-drop-animation">
                    <div className="rotate-wrapper mt-4 sm:w-1/2 flex justify-center">
                        <Link href="/UI/gallery/landing-page" className="block hover:rotate-3">
                            <Image
                                src="/profile.png"
                                alt="profile"
                                width={500}
                                height={400}
                                loading="lazy"
                                className="w-auto h-96 object-cover rounded-md"
                            />
                            <h3 className="font-semibold text-lg mt-4"></h3>
                            <p className="text-gray-600 mt-2"></p>
                        </Link>
                    </div>
                    <div className="mt-8 sm:mt-0 sm:w-1/2 sm:pl-8 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                            Design Smarter, Not Harder: AI-Powered Web Creation
                        </h1>
                        <p className="text-lg mb-6">
                            Create stunning websites effortlessly with AI-driven design. Our tools do the heavy lifting, allowing you to focus on your vision and build a site that truly shines.
                        </p>
                        <div className="flex justify-center sm:justify-start">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/login'}
                                className="text-white bg-neutral-950 hover:bg-gradient-to-bl font-bold rounded-full text-lg px-12 py-4 text-center"
                            >
                                Try Now
                            </button>
                        </div>
                    </div>
                </section>











                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-9 w-auto h-55 mb-16 text-center shadow-md rounded-lg">
                    <div className="text-2xl font-bold"></div>
                    <div className="text-sm"></div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => window.location.href = '/login'}
                            className="text-black bg-white hover:bg-gradient-to-bl   font-bold rounded-full text-lg px-12 py-4 text-center"
                        >
                            Get Started
                        </button>
                    </div>
                    <section className="my-2 mt-5 text-center">
                        <h2 className="text-3xl font-bold text-customPurple">USE CASES</h2>
                        <div className="car-collection flex flex-wrap justify-center mt-6 space-x-4">
                            <div className="text-center">
                                <p className="text-lg font-semibold"> Cosmetic</p>
                                <div className="rotate-wrapper mt-4">
                                    <Link href="/UI/gallery/landing-page" className="block  hover:rotate-3">
                                        <Image
                                            src="/cosmetic.png"
                                            alt="Digital Marketer"
                                            width={200}
                                            height={300}
                                            loading="lazy"
                                            className="w-full h-96 object-cover rounded-md"
                                        />
                                        <h3 className="font-semibold text-lg mt-4"></h3>
                                        <p className="text-gray-600 mt-2"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold">E-commerce </p>
                                <div className="rotate-wrapper mt-4">
                                    <Link href="/UI/gallery/landing-page" className="block hover:rotate-3">
                                        <Image
                                            src="/ecommerce.png"
                                            alt="E-commerce Product"
                                            width={500}
                                            height={300}
                                            loading="lazy"
                                            className="w-full h-96 object-cover rounded-md"
                                        />
                                        <h3 className="font-semibold text-lg mt-4"></h3>
                                        <p className="text-gray-600 mt-2"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold">Education</p>
                                <div className="rotate-wrapper mt-4">
                                    <Link href="/UI/gallery/landing-page" className="block  hover:rotate-3">
                                        <Image
                                            src="/education.png"
                                            alt="Digital Marketer"
                                            width={500}
                                            height={300}
                                            loading="lazy"
                                            className="w-full h-96 object-cover rounded-md"
                                        />
                                        <h3 className="font-semibold text-lg mt-4"></h3>
                                        <p className="text-gray-600 mt-2"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold">Car Branding
                                </p>
                                <div className="rotate-wrapper mt-4">
                                    <Link href="/UI/gallery/landing-page" className="block hover:rotate-3">
                                        <Image
                                            src="/carr.png"
                                            alt="E-commerce Product"
                                            width={500}
                                            height={300}
                                            loading="lazy"
                                            className="w-full h-96 object-cover rounded-md"
                                        />
                                        <h3 className="font-semibold text-lg mt-4"></h3>
                                        <p className="text-gray-600 mt-2"></p>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </section>
                    <div className="w-1/2 mx-auto mt-8">
                        <h1 className="text-4xl font-semibold mb-4">Build Better Faster</h1>
                        <p className="text-lg mb-6">Helps you create high-quality projects quickly and efficiently. We provide tools and strategies to speed up development and get great results without the usual delays. Perfect for anyone looking to work smarter and faster</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/signup" className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-200">Get Started</a>
                            <a href="/UI/gallery/landing-page" className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-black transition duration-200">Explore</a>

                        </div>
                    </div>
                </div>

                <div className="w-full bg-gradient-to-r from-[#FFE5E5] to-[#FFCCFF] py-12 px-6 sm:px-12">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start sm:gap-8 bg-white rounded-lg shadow-lg p-8">
                        <div className="flex-1">


                            <div className="relative w-[300px] h-[300px] flex justify-center items-center top-14">
                                <Image
                                    src="/carr.png"
                                    alt="Car-AI-web-design"
                                    width={150}
                                    height={150}
                                    className="absolute rounded-full shadow-lg z-30 transition-transform duration-500 ease-out hover:scale-110"
                                    style={{ transform: 'rotate(0deg) translate(150px) rotate(0deg)' }}
                                    loading="lazy"
                                />
                                <Image
                                    src="/cosmetic.png"
                                    alt="Cosmetic-AI-web-desing"
                                    width={150}
                                    height={150}
                                    className="absolute rounded-full shadow-lg z-30 transition-transform duration-500 ease-out hover:scale-110"
                                    style={{ transform: 'rotate(72deg) translate(150px) rotate(-72deg)' }}
                                    loading="lazy"
                                />
                                <Image
                                    src="/ecommerce.png"
                                    alt="Ecommerce-Ai-Web-design"
                                    width={150}
                                    height={150}
                                    className="absolute rounded-full shadow-lg z-30 transition-transform duration-500 ease-out hover:scale-110"
                                    style={{ transform: 'rotate(144deg) translate(150px) rotate(-144deg)' }}
                                    loading="lazy"
                                />
                                <Image
                                    src="/game.png"
                                    alt="AI-game-web-design"
                                    width={150}
                                    height={150}
                                    className="absolute rounded-full shadow-lg z-30 transition-transform duration-500 ease-out hover:scale-110"
                                    style={{ transform: 'rotate(216deg) translate(150px) rotate(-216deg)' }}
                                    loading="lazy"
                                />
                                <Image
                                    src="/education.png"
                                    alt="education-Ai-web-design"
                                    width={150}
                                    height={150}
                                    className="absolute rounded-full shadow-xl z-40 transition-transform duration-500 ease-out hover:scale-110"
                                    style={{ transform: 'rotate(288deg) translate(150px) rotate(-288deg)' }}
                                    loading="lazy"
                                />
                            </div>



                        </div>




                        <div className="mt-8 sm:mt-0 flex-1">
                            <h2 className="text-2xl font-bold mb-4">Create Your Free Website with WebLLix </h2>
                            <p className="text-lg mb-4">
                                Building your online presence has never been simpler. Follow these easy steps and launch your dream website today:
                            </p>

                            <h3 className="text-2xl font-semibold mb-2">Select Your Website Builder</h3>
                            <p className="mb-4">
                                Kickstart your journey with WebLLix Professional&apos;s cutting-edge platform. Enjoy a seamless experience with our secure, feature-rich website builder designed for both novices and experts.
                            </p>

                            <h3 className="text-2xl font-semibold mb-2">Design with Ease</h3>
                            <p className="mb-4">
                                Input your preferences, and let WebLLix&apos;s AI do the rest. Our AI will design a professional website tailored to your needs, and you&apos;ll receive the complete source code for full control and customization.
                            </p>

                            <h3 className="text-2xl font-semibold mb-2">Personalize Your Brand</h3>
                            <p className="mb-4">
                                Stand out from the crowd by customizing your website with our intuitive drag-and-drop editor. Tailor every aspect—from fonts and colors to images and layouts—to match your brand&apos;s identity.
                            </p>



                            <button
                                type="button"
                                onClick={() => window.location.href = '/login'}
                                className="text-white bg-gradient-to-r from-[#FF7F50] to-[#FF6347] hover:from-[#FF6347] hover:to-[#6bd4ec] shadow-lg hover:shadow-xl font-extralight rounded-full text-lg px-12 py-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                            >
                                Try Free
                            </button>

                        </div>
                    </div>
                </div>



                <div className="flex flex-col sm:flex-row">
                    <div className="text-center sm:text-left sm:w-1/2">
                        <p className="text-lg font-semibold"></p>
                        <div className="rotate-wrapper mt-4">
                            <Link href="/UI/gallery/landing-page" className="block hover:rotate-3">
                                <Image
                                    src="/Aiwebeditory.png"
                                    alt="Digital Marketer"
                                    width={500}
                                    height={400}
                                    loading="lazy"
                                    className="w-auto h-55 object-cover rounded-md"
                                />
                                <h3 className="font-semibold text-lg mt-4"></h3>
                                <p className="text-gray-600 mt-2"></p>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 sm:mt-0 flex-1 sm:w-1/2 sm:pl-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                            Build the future of the web today with AI.
                        </h1>
                        <p className="text-lg mb-6">
                            Transform your online presence with our AI-powered design. Make  it easy to create unique personalized websites design
                        </p>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/login'}
                                className="text-white bg-neutral-950 hover:bg-gradient-to-bl   font-bold rounded-full text-lg px-12 py-4 text-center"
                            >
                                Try Now
                            </button>
                        </div>
                    </div>
                </div>





                <section className="mb-16 p-9  water-drop-animation">
                    <div className="grid grid-cols-2 gap-20">


                    </div>

                </section>
            </main>









            <section id="top" className="bg-gray-100 py-20 px-12 flex items-center">
                <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden bg-white rounded-lg shadow-xl p-6">
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20"></div>

                    {/* Circular Images around the center */}
                    <Image
    src="/carr.png"
    alt="Car-AI-web-design-latest"
    width={150}
    height={150}
    className="absolute rounded-full shadow-xl z-40 transition-transform duration-500 ease-out hover:scale-110"
    style={{ width: '150px', height: 'auto', transform: 'rotate(0deg) translate(200px) rotate(-20deg)' }}
    loading="lazy"
  />
  <Image
    src="/cosmetic.png"
    alt="Cosmetic-AI-web-desing-latest"
    width={150}
    height={150}
    className="absolute rounded-full shadow-xl z-40 transition-transform duration-500 ease-out hover:scale-110"
    style={{ width: '150px', height: 'auto', transform: 'rotate(72deg) translate(200px) rotate(-100deg)' }}
    loading="lazy"
  />
  <Image
    src="/ecommerce.png"
    alt="Ecommerce-Ai-Web-design-latest"
    width={150}
    height={150}
    className="absolute rounded-full shadow-xl z-40 transition-transform duration-500 ease-out hover:scale-110"
    style={{ width: '150px', height: 'auto', transform: 'rotate(144deg) translate(200px) rotate(190deg)' }}
    loading="lazy"
  />
  <Image
    src="/game.png"
    alt="AI-game-web-design-latest"
    width={150}
    height={150}
    className="absolute rounded-full shadow-xl z-40 transition-transform duration-500 ease-out hover:scale-110"
    style={{ width: '150px', height: 'auto', transform: 'rotate(216deg) translate(200px) rotate(-216deg)' }}
    loading="lazy"
  />
  <Image
    src="/carr.png"
    alt="AI-game-web-desig-latest"
    width={150}
    height={150}
    className="relative rounded-full shadow-2xl z-50 transition-transform duration-500 ease-out hover:scale-110"
    style={{ width: '150px', height: 'auto', transform: 'rotate(288deg) translate(200px) rotate(-288deg)' }}
    loading="lazy"
  />


                </div>





                <div className="w-1/2">
                    <div className="rotate-wrapper mt-4">
                        <Link href="/UI/gallery/landing-page" className="block hover:rotate-3">
                            <Image
                                src="/them.png"
                                alt="Digital Marketer"
                                width={500}
                                height={400}
                                loading="lazy"
                                className="w-full h-96 object-cover rounded-md"
                            />
                            <h3 className="font-semibold text-justify mt-4"> </h3>
                            <p className="text-gray-600 mt-2"></p>
                        </Link>
                    </div>
                    <h1 className="text-4xl font-semibold mb-4"></h1>
                    <p className="text-lg mb-6">Stay Ahead With AI-Powered Web Design</p>
                    <div className="flex">
                        <a href="/login" className="bg-yellow-500 text-white px-6 py-3 rounded-full mr-4 hover:bg-yellow-600 transition duration-200">Try Free</a>
                        <a href="/blog" className="bg-gray-800 text-white px-6 py-3 rounded-full mr-4 hover:bg-black transition duration-200">Template</a>

                    </div>
                </div>
            </section>




        </div>
    )
}
export default Section;