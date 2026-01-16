'use client'

import React from "react";


const FrequentlyAsk = () => {
    return (
        <div
            className="relative w-full bg-white px-6 pt-10 pb-8 mt-8   sm:mx-auto sm:max-w-2xl sm:rounded-lg ">
            <div className="mx-auto px-5">
                <div className="flex flex-col items-center">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
                    <p className="mt-3 text-lg md:text-xl">Frequenty asked questions

                    </p>
                </div>
                <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
                    <div className="py-5">
                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                <span> Can I get the Source Code ?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <p className="group-open:animate-fadeIn mt-3 text-neutral-600">Absolutely! Webllix is designed to be both powerful and easy to use. Whether you are setting up a portfolio, an online store, or a business site, Webllix gives you the tools to customize everything—layout, drag and drop,colors, and content. Plus, our AI Image Generator can help you add that extra touch of elegance to your website with beautifully crafted visuals
                            </p>
                        </details>
                    </div>
                    <div className="py-5">
                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                <span> Can I use Webllix  free?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <p className="group-open:animate-fadeIn mt-3 text-neutral-600">Yes! Webllix is free to use, though some features have limits.
                            </p>
                        </details>
                    </div>
                    
                    <div className="py-5">
                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                <span> What kind of websites design can I create with this tool?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <a className="text-blue-500 hover:underline" href="/UI/gallery/landing-page">Collection</a>

                         
                            Whether its a sleek landing page, an e-commerce site, or any other type of website, Webllix makes it happen. Whatever your vision, Webllix brings it to life, designing websites for all fields.

                            <a className="text-blue-500 hover:underline" href="/pricing">Plan.</a>
                        </details>
                    </div>
                    <div className="py-5">
                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                <span> If I amm a Beginner, Can I Create a Professional Website?  </span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <p className="group-open:animate-fadeIn mt-3 text-neutral-600">Yes, absolutely! If you are a beginner, you have come to the right place. Webllix makes it easy for beginners to design a website with just a simple prompt. In no time, your professional-looking website will be ready!
                            </p>
                        </details>
                    </div>
                    <div className="py-5">
                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                <span> Can I build  responsive website  ?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <p className="group-open:animate-fadeIn mt-3 text-neutral-600">Yes, Webllix Designs Websites Based on Your Preferences
                            Webllix takes your input and designs a website that matches your vision. After that, webllix  build a responsive site .Webllix gives you the tools to customize everything—layout, drag adn drop,colors, and content. Plus, our AI Image Generator can help you add that extra touch of elegance to your website with beautifully crafted visuals
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrequentlyAsk;
