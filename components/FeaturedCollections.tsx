
import React, { useContext } from 'react';
import { collections } from '../constants';
import { AppContext } from '../context/AppContext';
import ImageWithSkeleton from './ImageWithSkeleton';

const FeaturedCollections: React.FC = () => {
  const { setRoute } = useContext(AppContext);

  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">Featured Collections</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map(collection => (
            <div key={collection.name} className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg" onClick={() => setRoute({ page: 'shop' })}>
              <ImageWithSkeleton
                src={collection.image}
                alt={collection.name}
                wrapperClassName="w-full h-96"
                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white tracking-wider border-2 border-white px-6 py-3 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  {collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
