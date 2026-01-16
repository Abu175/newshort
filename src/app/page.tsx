import Image from 'next/image'

import React from "react";

import Hero from "@/app/UI/Hero/page";

import Head from '@/app/UI/head/page'
import Footer from './UI/footer/page';
import Nav from "@/app/UI/Nav/page";
import Faq from "@/app/UI/faq/page"



export default function Home() {
  return (
    <main className="">
      <Nav/>
      <Hero/>
      <Head />
      <Faq/>
      <Footer />
      
    </main>
  )
}