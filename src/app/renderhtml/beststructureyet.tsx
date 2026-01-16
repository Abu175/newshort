'use client'
import React, { useEffect, useState } from 'react';


const Hero: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <header className={scrolled ? 'scrolled' : ''}>
                <div className="container">
                    <nav>
                        <div className="logo">AI Web Design</div>
                        <div className="nav-links">
                            <a href="#about">About</a>
                            <a href="#features">Features</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>The AI Revolution in Web Design</h1>
                        <p>Discover how artificial intelligence is transforming the way we create and interact with websites.</p>
                        <a href="#" className="cta-button">Learn More</a>
                    </div>
                </div>
                <div className="hero-bg"></div>
            </section>
        </div>
    );
};

export default Hero;



///use rooot csss befor applying this 