
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Join the Vault</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Be the first to know about exclusive launches, events, and private offers.</p>
        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-6 py-3 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;