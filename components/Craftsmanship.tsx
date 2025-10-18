
import React from 'react';
import ImageWithSkeleton from './ImageWithSkeleton';

const Craftsmanship: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <ImageWithSkeleton
            src="https://picsum.photos/seed/craft/800/600"
            alt="Watchmaker crafting a watch"
            wrapperClassName="rounded-lg shadow-2xl aspect-[4/3]"
            imgClassName="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 text-left">
          <h2 className="text-5xl font-bold mb-4">The Art of Horology</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            At Chronovault, watchmaking is more than a process; it's a passion. Our master craftsmen assemble each component by hand, ensuring every detail meets our exacting standards of excellence.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            From the intricate dance of the tourbillon to the satisfying click of the chronograph, each feature is a testament to a legacy of skill passed down through generations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
