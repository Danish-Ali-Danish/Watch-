
import React from 'react';
import { trendingProducts } from '../constants';
import ProductCard from './ProductCard';

const TrendingProducts: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">Trending Now</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;