import React from 'react';

const BrandStory: React.FC = () => {
  return (
    <section 
      className="relative py-32 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url(https://picsum.photos/seed/gears/1920/1080)' }}
    >
      <div className="absolute inset-0 bg-black/70 grayscale"></div>
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          A Legacy of Timekeeping Excellence.
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-6 mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-200 text-lg">
          Since our inception, Chronovault has been dedicated to the art of horology, blending timeless tradition with cutting-edge innovation to create timepieces that are not just worn, but experienced.
        </p>
      </div>
    </section>
  );
};

export default BrandStory;