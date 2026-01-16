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
            className="search-result flex flex-row-reverse p-4 border-b border-gray-200 cursor-pointer"
            itemScope
            itemType="http://schema.org/Article"
            onClick={onClick}
        >
            <Image
                src={imageUrl}
                alt={title}
                className="w-24 h-24 object-cover mr-4 rounded-lg"
                width={500}
                height={300}
                loading="lazy"
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

const Aiwebdesign: React.FC = () => {
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const keyword= ["Ai webdesign", "Ai webdesign generator",  "Education", "Architecture", "Yacht", "Cosmetics"];



    const results = [
        {
            title: `${keyword} AI web templates by webllix`,
            url: 'https://www.webllix.com/',
            description: 'Explore the latest trends in landing page designs for 2024. Get inspired by modern and minimalist designs that captivate users.',
            imageUrl: '/education.png', 
        },
        {
            title: `${keyword} Landing page design by webllix `,
            url: 'https://www.webllix.com/',
            description: 'Learn how to customize your landing page effectively to increase user engagement and conversions. Practical tips for a standout design.',
            imageUrl: '/archit.png', 
        },
        {
            title: `${keyword} Modern AI Landing Page for Yacht Selling`,
            url: 'https://www.webllix.com/',
            description: 'Explore the latest trends in landing page designs for 2024. Get inspired by modern and minimalist designs that captivate users.',
            imageUrl: '/yacht.png', 
        },
        {
            title: `${keyword} Top Customization Tips for Your Landing Page - Modern Landing Page for Cosmetics`,
            url: 'https://www.webllix.com/',
            description: 'Learn how to customize your landing page effectively to increase user engagement and conversions. Practical tips for a standout design.',
            imageUrl: '/cosmetic.png', 
        },
        // Add more results as needed
    ];

    const filteredResults = results.filter(result =>
        result.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        result.description.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const pageTitle = `${keyword} Top Landing Page Design Inspirations | Webllix`;
    const pageDescription = "Discover the latest and most effective landing page designs for 2024. Get inspiration and tips on how to customize your page for better user engagement and conversions.";

    const handleResultClick = (url: string) => {
        setSelectedUrl(url);
        setShowImage(true); 
    };
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="responsive web design, custom web design,AI  web design " />
                <link rel="canonical" href="https://www.Webllix.com" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.webllix.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <link rel="canonical" href="https://www.webllix.com/Search" />
   

            </Head>
            <Nav />
            <div className="flex max-w-6xl mx-auto my-10">
                <aside className="w-1/4 pr-4">
                    <nav aria-label="Category" className="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <ul className="space-y-2">
                           
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 hover:underline hover:bg-green-50 p-2 rounded-md transition-colors duration-300">
                                    Educational
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-pink-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="/" className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:bg-blue-50 p-2 rounded-md transition-colors duration-300">
                                    E-commerce
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-yellow-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-purple-600 hover:text-purple-800 hover:underline hover:bg-purple-50 p-2 rounded-md transition-colors duration-300">
                                    Social Media 
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-teal-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:bg-blue-50 p-2 rounded-md transition-colors duration-300">
                                    Hotel 
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-yellow-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline hover:bg-red-50 p-2 rounded-md transition-colors duration-300">
                                    Forum 
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-purple-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 hover:underline hover:bg-green-50 p-2 rounded-md transition-colors duration-300">
                                    Digital Product
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-pink-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-purple-600 hover:text-purple-800 hover:underline hover:bg-purple-50 p-2 rounded-md transition-colors duration-300">
                                    Fitness
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-teal-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline hover:bg-red-50 p-2 rounded-md transition-colors duration-300">
                                    Sports
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-purple-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:bg-blue-50 p-2 rounded-md transition-colors duration-300">
                                    Consulting
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-yellow-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-green-600 hover:text-green-800 hover:underline hover:bg-green-50 p-2 rounded-md transition-colors duration-300">
                                    Restaurant
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-pink-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                            <li className="transition-transform transform hover:scale-105 flex items-center space-x-2">
                                <a href="" className="text-lg font-semibold text-purple-600 hover:text-purple-800 hover:underline hover:bg-purple-50 p-2 rounded-md transition-colors duration-300">
                                    Hospitality 
                                </a>
                                <span className="text-sm font-medium text-gray-500 bg-teal-200 px-2 py-1 rounded-full">
                                    Upcoming
                                </span>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="w-3/4 pl-4">
                    <h1 className="text-3xl font-bold mb-6">Landing Page Inspirations</h1>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                        placeholder="Search..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    {filteredResults.map((result, index) => (
                        <SearchResult
                            key={index}
                            title={result.title}
                            url={result.url}
                            description={result.description}
                            imageUrl={result.imageUrl}
                            onClick={() => handleResultClick(result.url)}
                        />
                    ))}
                    {showImage && selectedUrl && (
                        <div className="image-popup">
                            <Image src={selectedUrl} alt="Selected"    width={500}
                                height={300}
                                loading='lazy'/>
                            <button onClick={() => setShowImage(false)}>Close</button>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Aiwebdesign;
