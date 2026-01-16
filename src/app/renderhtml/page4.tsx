import React from 'react';

const QuantumAIDesign: React.FC = () => {
  return (
    <div className="circuit-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Futuristic Header */}
        <header className="mb-24 text-center">
          <h1 className="text-6xl font-bold mb-4 tech-font">AI Web Design: Quantum Leap</h1>
          <p className="text-xl mb-8">Exploring the Singularity of Digital Creation</p>
          <div className="flex justify-center items-center space-x-4">
            <img src="/emily-avatar.jpg" alt="Emily Chen" className="w-16 h-16 rounded-full border-2 border-cyan-400" />
            <div className="text-left">
              <p className="font-semibold">Emily Chen</p>
              <p className="text-sm text-cyan-400">Quantum Design Architect</p>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-12 gap-8">
          {/* Vertical Timeline */}
          <aside className="col-span-2 space-y-8">
            {[25, 50, 75, 100].map((value, index) => (
              <React.Fragment key={value}>
                <div className="radial-progress w-24 h-24" style={{ '--value': value } as React.CSSProperties}>
                  <span className="text-2xl font-bold">{value}%</span>
                </div>
                {index < 3 && <div className="h-32 w-1 bg-cyan-800 mx-auto"></div>}
              </React.Fragment>
            ))}
          </aside>

          {/* Content Sections */}
          <div className="col-span-10 space-y-16">
            <section className="bg-black bg-opacity-50 p-8 rounded-3xl border border-cyan-800">
              <h2 className="text-3xl font-bold mb-6 tech-font">Quantum Entanglement of Design</h2>
              <p className="text-lg mb-6">
                In the quantum realm of web design, AI algorithms interweave with human creativity, producing designs that exist in a superposition of innovation and functionality.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['Superposition', 'Entanglement', 'Wave Function'].map((title, index) => (
                  <div key={title} className="bg-cyan-900 bg-opacity-30 p-4 rounded-xl">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p>{['Designs exist in multiple states simultaneously', 'User experience intrinsically linked to AI decisions', 'Collapsing possibilities into optimal designs'][index]}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Playground */}
            <section className="bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-3xl border border-cyan-400">
              <h2 className="text-3xl font-bold mb-6 text-center tech-font">Quantum AI Playground</h2>
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe src="https://quantum-ai-demo.com" className="w-full h-full rounded-xl"></iframe>
              </div>
              <div className="text-center">
                <button className="bg-cyan-400 text-black font-bold py-3 px-8 rounded-full hover:bg-cyan-300 transition duration-300 tech-font">
                  Collapse the Wave Function
                </button>
              </div>
            </section>

            {/* Futuristic Insights */}
            <section className="grid grid-cols-2 gap-8">
              {['Quantum Advantages', 'Quantum Challenges'].map((title, index) => (
                <div key={title} className="bg-black bg-opacity-50 p-6 rounded-3xl border border-cyan-800">
                  <h3 className="text-2xl font-bold mb-4 tech-font">{title}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {[
                      ['Infinite design possibilities explored simultaneously', 'Hyper-personalization through quantum user profiling', 'Time-bending efficiency in design iterations'],
                      ['Ethical implications of quantum consciousness in AI', 'Maintaining coherence in multi-dimensional designs', 'Bridging quantum designs with classical user interfaces']
                    ][index].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </main>

        {/* Futuristic Call-to-Action */}
        <section className="mt-24 bg-gradient-to-r from-cyan-900 to-blue-900 p-12 rounded-3xl text-center border border-cyan-400">
          <h2 className="text-4xl font-bold mb-6 tech-font">Join the Quantum Design Revolution</h2>
          <p className="text-xl mb-8">Transcend classical design limitations. Enter the quantum realm of web creation.</p>
          <form className="flex max-w-md mx-auto">
            <input type="email" placeholder="Your quantum email" className="flex-grow px-6 py-3 rounded-l-full bg-black bg-opacity-50 text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 border-cyan-800 border" />
            <button type="submit" className="bg-cyan-400 text-black px-8 py-3 rounded-r-full font-bold hover:bg-cyan-300 transition duration-300 tech-font">Entangle</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default QuantumAIDesign;