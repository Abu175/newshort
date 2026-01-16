import React from 'react';


const App: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Article />
        </div>
    );
};

const Article: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <HeroSection />
            <MainContent />
            <Footer />
        </div>
    );
};

const HeroSection: React.FC = () => {
    return (
        <header className="relative mb-32 clip-path-hero bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-24 pb-48">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzg4ODg4ODIwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-7xl font-extrabold mb-6 neon-text">
                    The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">Web Design</span>
                </h1>
                <p className="text-3xl mb-12 text-cyan-200">AI Revolution: Reshaping the Digital Landscape</p>
                <AuthorInfo />
            </div>
            <CustomShapeDivider />
        </header>
    );
};

const AuthorInfo: React.FC = () => {
    return (
        <div className="flex justify-center items-center space-x-6">
            <img src="/emily-avatar.jpg" alt="Emily Chen" className="w-20 h-20 rounded-full border-4 border-cyan-300 glow" />
            <div className="text-left">
                <p className="font-bold text-2xl">Emily Chen</p>
                <p className="text-cyan-200">May 15, 2023 • 15 min read</p>
            </div>
        </div>
    );
};

const CustomShapeDivider: React.FC = () => {
    return (
        <div className="custom-shape-divider-bottom-1682452701">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
    );
};

const MainContent: React.FC = () => {
    return (
        <main className="relative z-10">
            <FloatingNav />
            <IntroductionSection />
            {/* Other sections can be added similarly */}
            <InteractiveAIDemo />
            <ConclusionSection />
        </main>
    );
};

const FloatingNav: React.FC = () => {
    return (
        <nav className="fixed top-1/2 right-8 transform -translate-y-1/2 space-y-4 z-50">
            {['introduction', 'what-is-ai-web-design', 'benefits', 'challenges', 'future', 'conclusion'].map((id) => (
                <a key={id} href={`#${id}`} className="block w-3 h-3 rounded-full bg-cyan-400 hover:bg-pink-500 transition-colors duration-300"></a>
            ))}
        </nav>
    );
};

const IntroductionSection: React.FC = () => {
    return (
        <section id="introduction" className="mb-32">
            <h2 className="text-5xl font-bold mb-8 neon-text">Introduction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <p className="text-xl leading-relaxed">
                    The web design industry stands on the brink of a revolutionary transformation. Artificial Intelligence (AI) has transcended its status as a futuristic concept, emerging as a tangible force reshaping the landscape of digital creation. From automating intricate tasks to generating entire layouts, AI is not just a tool—it's becoming the architect of a new design paradigm.
                </p>
                <div className="relative group">
                    <img src="/ai-web-design-intro.jpg" alt="AI Web Design Concept" className="rounded-lg shadow-lg transition duration-300 group-hover:shadow-cyan-500/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-75 transition duration-300 flex items-end justify-center p-4">
                        <p className="text-white text-center">AI is transforming the landscape of web design</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const InteractiveAIDemo: React.FC = () => {
    return (
        <section className="my-32 bg-gradient-to-r from-blue-900 to-purple-900 clip-path-section py-24 px-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMlY2aDRWNGgtNHpNNiAzNHYtNEg0djRIMHYyaDR2NGgydi00aDR2LTJINnpNNiA0VjBINHY0SDB2Mmg0djRoMlY2aDRWNEg2eiIgZmlsbD0iI2ZmZmZmZjEwIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-30"></div>
            <h2 className="text-5xl font-bold mb-12 text-center neon-text">Experience AI-Powered Design</h2>
            <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                <div className="aspect-w-16 aspect-h-9 mb-8">
                    <iframe src="https://ai-design-demo.com" className="w-full h-full rounded-lg shadow-lg"></iframe>
                </div>
                <p className="text-xl text-center mb-8">Interact with our AI design assistant to create your own unique web layout in real-time.</p>
                <div className="flex justify-center">
                    <button className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full hover:bg-pink-500 transition duration-300 transform hover:scale-105 glow">
                        Try AI Design Now
                    </button>
                </div>
            </div>
        </section>
    );
};

const ConclusionSection: React.FC = () => {
    return (
        <section id="conclusion" className="mt-32 text-center">
            <h2 className="text-5xl font-bold mb-8 neon-text">Embracing the AI-Driven Future</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
                As we stand at the forefront of this AI revolution in web design, it's clear that the future holds boundless potential. Embracing these changes isn't just an option—it's a necessity for those who wish to lead in the ever-evolving digital landscape.
            </p>
            <div className="flex justify-center">
                <button className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full hover:bg-pink-500 transition duration-300 transform hover:scale-105 glow">
                    Learn More About AI in Design
                </button>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="mt-32 text-center">
            <p className="text-gray-300">&copy; 2023 The Future of Web Design. All Rights Reserved.</p>
        </footer>
    );
};

export default App;
