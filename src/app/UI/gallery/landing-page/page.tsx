'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '@/app/UI/Nav/page';
import Footer from '@/app/UI/footer/page';
import Image from 'next/image';





interface SearchResultProps {
    title: string;
    url: string;
    description: string;
    imageUrl: string;
    onClick: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ title, url, description, imageUrl, onClick }) => {
    return (
        <article
            className="search-result flex p-4 border-b border-gray-200 cursor-pointer"
            itemScope
            itemType="http://schema.org/Article"
            onClick={onClick}
        >
            <Image
                src={imageUrl}
                alt={title}
                width={500}
                height={300}
                loading='lazy'

                className="w-24 h-24 object-cover mr-4 rounded-lg"
            />
            <div>
                <h2 itemProp="headline">
                    <a
                        href="#"
                        className="title text-blue-600 text-lg font-semibold hover:underline"
                    >
                        {title}
                    </a>
                </h2>
                <p className="url text-sm text-gray-500">{new URL(url).hostname}</p>
                <p className="description text-gray-700 mt-2" itemProp="description">
                    {description}
                </p>
            </div>
        </article>
    );
};

const SearchResultsPage: React.FC = () => {
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

    const results = [
        {
            title: 'Innovative Website Design and Development',
            url: 'https://webllix/UI/gallery/landing-page',
            description: 'Discover the cutting-edge trends in website design for 2024. Get inspired by sleek, modern aesthetics that engage and captivate users.',
            imageUrl: '/education.png', // Replace with the appropriate image URL
        },
        {
            title: 'Architectural Landing Page Design by Ai Webllix',
            url: 'https://www.webllix/UI/gallery/landing-page',
            description: 'Unlock the secrets to a captivating landing page tailored for architectural firms.',
            imageUrl: '/archit.png', // Replace with the appropriate image URL
        },
        {
            title: 'Sleek Modern Landing Page for Yacht company',
            url: 'https://webllix/UI/gallery/landing-page',
            description: 'Transform your yacht company with our state-of-the-art AI design tools. Enjoy smart, intuitive features that elevate your design presence.',
            imageUrl: '/yacht.png', // Replace with the appropriate image URL
        },
        {
            title: 'Expert Tips for Customizing Your Landing Page',
            url: 'https://webllix/UI/gallery/landing-page',
            description: 'Make your landing page stand out with AI-driven design tips. Learn how to create stunning visuals effortlessly and boost your online appeal.',
            imageUrl: '/cosmetic.png', // Replace with the appropriate image URL
        },
        {
            title: 'Elegant Modern Website Design for Hotels by Webllix',
            url: 'https://webllix/UI/gallery/landing-page',
            description: 'Elevate your hotels online presence with our seamless AI-powered design tools. Create and optimize visually striking designs with ease.',
            imageUrl: '/a3.png', // Replace with the appropriate image URL
        },
        {
            title: 'Ultimate Customization Tips for Game Website Design',
            url: 'https://webllix/UI/gallery/landing-pages',
            description: 'Revolutionize your game website with advanced AI tools. ',
            imageUrl: '/game.png', // Replace with the appropriate image URL
        },
    ];
    const pageTitle = " Custom website design Ai Webllix";
    const pageDescription = "Discover the latest and most effective landing page designs for 2024. Get inspiration and tips on how to customize your page for better user engagement and conversions.";

    const handleResultClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl); // Set the selected image URL
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="custom website design, AI website design , custom website design,website design ideas" />
                <link rel="canonical" href="https://www.webllix.com/UI/gallery/landing-page" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.webllix.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
            </Head>
            <Nav />
            <div className="flex max-w-6xl mx-auto my-10">
                <aside className="w-1/4 pr-4">
                    <nav aria-label="Category" className="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>


                    </nav>
                    <aside className="w-1/4 pr-4">
                        <nav aria-label="Category" className="bg-gray-100 p-4 rounded-lg shadow">

                            <ul className="space-y-2">
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="/" className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:bg-blue-50 p-2 rounded-md transition-colors duration-300">
                                        E-commerce
                                    </a>
                                 
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 hover:underline hover:bg-green-50 p-2 rounded-md transition-colors duration-300">
                                        Educational
                                    </a>
                               
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-purple-600 hover:text-purple-800 hover:underline hover:bg-purple-50 p-2 rounded-md transition-colors duration-300">
                                        Social Media
                                    </a>
                               
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline hover:bg-red-50 p-2 rounded-md transition-colors duration-300">
                                        Forum
                                    </a>
                                 
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:bg-blue-50 p-2 rounded-md transition-colors duration-300">
                                        Hotel
                                    </a>
                                
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 hover:underline hover:bg-green-50 p-2 rounded-md transition-colors duration-300">
                                        Digital Product
                                    </a>
                                   
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-purple-600 hover:text-purple-800 hover:underline hover:bg-purple-50 p-2 rounded-md transition-colors duration-300">
                                        Fitness
                                    </a>
                              
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline hover:bg-red-50 p-2 rounded-md transition-colors duration-300">
                                        Sports
                                    </a>
                                   
                                </li>


                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:bg-blue-50 p-2 rounded-md transition-colors duration-300">
                                        Consulting
                                    </a>
                                 
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 hover:underline hover:bg-green-50 p-2 rounded-md transition-colors duration-300">
                                        Freelancer Portfolio
                                    </a>
                               
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-purple-600 hover:text-purple-800 hover:underline hover:bg-purple-50 p-2 rounded-md transition-colors duration-300">
                                        Gaming
                                    </a>
                                 
                                </li>
                                <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                    <a href="" className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline hover:bg-red-50 p-2 rounded-md transition-colors duration-300">
                                        Creative
                                    </a>
                                  
                                </li>

                            </ul>
                        </nav>
                    </aside>
                </aside>
                <main className="w-3/4">
                    <header>
                        <h1 className="text-3xl font-bold mb-6">Top Landing Page Design Inspirations for 2024</h1>
                    </header>
                    <nav aria-label="Breadcrumb" className="mb-4">
                        <ol className="flex text-sm text-gray-500 space-x-2">
                            <li>
                                <a href="" className="hover:underline font-medium text-gray-700">
                                    Home
                                </a>
                            </li>
                            <li>/</li>
                            <li>
                                <a href="" className="hover:underline font-medium text-gray-700">
                                    Landing Page Inspiration
                                </a>
                            </li>
                            <li>/</li>
                            <li aria-current="page" className="font-semibold text-gray-800">
                                Top Landing Page Designs
                            </li>
                        </ol>
                    </nav>


                    {selectedImageUrl ? (
                        <div className="flex justify-center">
                            <Image
                                src={selectedImageUrl}
                                alt="Selected Image"
                                className="border border-gray-200 rounded-lg"
                                width={500}
                                height={300}
                                loading='lazy'

                            />
                        </div>
                    ) : (
                        results.map((result, index) => (
                            <SearchResult
                                key={index}
                                title={result.title}
                                url={result.url}
                                description={result.description}
                                imageUrl={result.imageUrl}
                                onClick={() => handleResultClick(result.imageUrl)}
                            />
                        ))
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default SearchResultsPage;
