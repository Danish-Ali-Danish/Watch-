import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Hero: React.FC = () => {
  const { setRoute } = useContext(AppContext);
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-gray-800 dark:text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/herowatch/1920/1080)' }}
      ></div>
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm"></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)' }}></div>
      <div className="relative z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in-down text-white">
          Time. Crafted to Perfection.
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-up">
          Discover Swiss precision and modern design.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => setRoute({ page: 'shop', filters: { category: 'Men' } })}
            className="px-10 py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
          >
            Shop Men's
          </button>
          <button
            onClick={() => setRoute({ page: 'shop', filters: { category: 'Women' } })}
            className="px-10 py-3 border border-gray-200 text-white font-bold rounded-md text-lg transition-all duration-300 hover:bg-gray-200 hover:text-black hover:scale-105"
          >
            Shop Women's
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;