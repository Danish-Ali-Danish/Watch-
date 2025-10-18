import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { allProducts } from '../constants';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
    const { wishlist, setRoute } = useContext(AppContext);
    const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));

    return (
        <div className="bg-white dark:bg-black pt-32 min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold">My Wishlist</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
                </div>

                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {wishlistProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-3xl text-gray-700 dark:text-gray-300">Your Wishlist is Empty</h2>
                        <p className="text-gray-500 mt-4 mb-8">
                            Explore our collections and add your favorite timepieces to come back to them later.
                        </p>
                        <button
                            onClick={() => setRoute({ page: 'shop' })}
                            className="px-10 py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
                        >
                            Explore Collection
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;