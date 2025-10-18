
import React from 'react';

const WhyChooseUs: React.FC = () => {
  const features = [
    { title: "Swiss Precision", description: "Every timepiece is powered by a meticulously crafted Swiss movement for unmatched accuracy." },
    { title: "Premium Materials", description: "We use only the finest materials, from 316L stainless steel to sapphire crystals." },
    { title: "Timeless Design", description: "Our watches are designed to be heirlooms, blending classic aesthetics with modern sensibilities." },
    { title: "Global Warranty", description: "Enjoy peace of mind with our comprehensive international warranty on all watches." },
  ];
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">Why Chronovault?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map(feature => (
            <div key={feature.title} className="p-8 bg-gray-50 dark:bg-[#111] rounded-lg border border-transparent hover:border-yellow-600/20 dark:hover:border-yellow-800/50 transition-colors">
              <h3 className="text-xl font-bold text-yellow-500 dark:text-yellow-400 mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;