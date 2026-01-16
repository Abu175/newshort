




'use client'

import React from "react";
import Link from "next/link";


const Support= () => {
    return (

        <div className="bg-white dark:bg-white h-screen">
        <div className="container mx-auto py-16 dark:text-white">
            <div className="text-center">
                <h2 className="font-bold text-2xl md:text-4xl  my-4 ">What is included in the AI Tool Service?</h2>
                <div className="max-w-2xl md:max-w-4xl mx-auto dark:text-black  my-4 leading-6 tracking-wide " >
                    <p>
                    Our AI tool service goes through a thorough analysis that&apos;s super detailed. Its used by students lawyers, and universities all around the globe in their everyday tasks. 
                    We have made sure it&apos;s completely spam-free and encrypted so your PDFs and data are safe 
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 mx-auto max-w-xl md:max-w-2xl gap-4 my-4">
                <div className="p-4 border flex flex-col items-center rounded max-w-sm bg-gradient-to-r from-blue-50 to-white-500">
                    <div className="text-4xl font-bold text-black">Darkmode<span className="text-yellow-500">✨✨</span></div>
                    <div className="text-300 text-uppercase text-black"></div>
                </div>
                <div className="p-4 border flex flex-col items-center rounded max-w-sm bg-gradient-to-r from-blue-50 to-white-500">
                    <div className="text-4xl font-bold text-black">Free Tool<span className="text-teal-500"></span></div>
                    <div className="text-300 text-uppercase text-black">Draw/pdf sign</div>
                </div>
                <div className="p-4 border flex flex-col items-center rounded max-w-sm bg-gradient-to-r from-blue-50 to-white-500">
                    <div className="text-4xl font-bold text-black">101mb<span className="text-pink-500"></span></div>
                    <div className="text-300 text-uppercase text-black">supported</div>
                </div>
                <div className="p-4 border flex flex-col items-center rounded max-w-sm bg-gradient-to-r from-blue-50 to-white-500">
                    <div className="text-4xl font-bold text-black">pdf/img<span className="text-violet-500"></span></div>
                    <div className="text-300 text-uppercase text-black">upgrading more features</div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Support;



