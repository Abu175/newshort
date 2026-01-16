

'use client'
import { LogIn } from 'lucide-react';


import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Logo from '@/app/UI/logo/page';

const Nav = () => {
  const logo = {
    name: 'LogoName',
    icon: 'LogoIcon',
    business: { name: 'BusinessName' },
    alt: 'Logo Alt Text',
    size: 50,

    quality: 75,
  };

  return (
    <div className=" bg-gray-900 max-width: 320px " >
      <Head>
        <title>Build landing page</title>
        <meta name="author" content="Webblix" />
        <meta name="keywords" content=" AI Webdesign.AI Top website,Ai web make" />
        <meta
          name="description"
          content="Webblix Design webiste wiht AI "
        />
        <link rel="canonical" href="https://webllix.com" />
        <meta property="og:title" content="TheChatPdf - Webllix, you dont need technical skills. Simply input your preferences, and our AI-powered platform will design a professional website design, Webllix has own code editor Customize layouts, colors, and content with our intuitive drag-and-drop interface to make your site truly unique" />
        <meta
          property="og:description"
          content="Build Your Website with Weblix ,Design Any type website woth Webllix"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webllix.com" />
        <meta property="og:image" content="https://webllix.com/og-logo.jpg" />
      </Head>





      <header className="bg-white rounded-lg ">
        <div className="container  px-9 py-8 flex justify-between items-center text-white">

          <div className="flex items-center space-x-4">
            <Logo />
            <span className="ml-2 text-white text-xl font-semibold">WᴇʙʟLix</span>
            <div className="flex items-center">


            </div>
          </div>
          






          <div className="flex items-center space-x-4 ">
            <a href="/signup" className="underline">

              Sign In
            </a>

          </div>
        </div>
      </header>


    </div>
  );
};

export default Nav;





