
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { allProducts } from '../constants';

const BrandsSection: React.FC = () => {
  const { setRoute } = useContext(AppContext);
  const brands = [...new Set(allProducts.map(p => p.brand))];

  const handleBrandClick = (brandName: string) => {
    setRoute({ page: 'shop', filters: { brand: brandName } });
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">Our Esteemed Brands</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover timepieces from the world's most prestigious and innovative watchmakers.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {brands.map(brand => (
            <div 
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className="cursor-pointer group flex items-center justify-center p-8 bg-gray-50 dark:bg-[#111] rounded-lg border border-transparent hover:border-yellow-600/20 dark:hover:border-yellow-800/50 transition-all duration-300"
            >
              <h3 className="text-4xl font-bold tracking-widest text-gray-500 dark:text-gray-400 group-hover:gold-gradient-text transition-colors duration-300">
                {brand.toUpperCase()}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
