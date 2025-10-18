
import React, { useContext } from 'react';
import type { Product } from '../types';
import { HeartIcon, StarIcon } from './Icons';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';
import ImageWithSkeleton from './ImageWithSkeleton';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { setRoute, wishlist, addToWishlist, removeFromWishlist } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);
  const { addToastNotification } = useContext(NotificationContext);

  const isInWishlist = wishlist.includes(product.id);

  const dialColorMap: { [key: string]: string } = {
    Black: 'bg-gray-800',
    White: 'bg-white border border-gray-400',
    Blue: 'bg-blue-600',
    Green: 'bg-green-600',
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the heart
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultStrap = product.straps?.find(s => s.type === product.strapType) || { type: product.strapType, image: product.image };
    const defaultDial = product.dialColors?.find(d => d.type === product.dialColor) || { type: product.dialColor, image: product.image };

    addToCart(product, 1, defaultStrap, defaultDial);
    addToastNotification('Added to Cart!', 'success', `${product.name}`);
    
    // Redirect to checkout after a short delay to allow toast to be seen
    setTimeout(() => {
        setRoute({ page: 'checkout' });
    }, 500);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} filled={i <= product.rating} />);
    }
    return stars;
  };

  return (
    <div className="group relative bg-white dark:bg-[#111] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/20 hover:-translate-y-2 border border-gray-200 dark:border-transparent">
      <div onClick={() => setRoute({ page: 'product', productId: product.id })} className="cursor-pointer">
        <ImageWithSkeleton
          src={product.image}
          alt={product.name}
          wrapperClassName="overflow-hidden aspect-square"
          imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="p-4 text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
          <div className="flex items-center my-2">
            {renderStars()}
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">({product.reviews.length})</span>
          </div>
          <p className="text-xl gold-gradient-text font-bold mb-2">${product.price.toLocaleString()}</p>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-2 min-h-[40px] flex items-center">
            <div className="relative w-full h-[32px]">
                {/* Static info */}
                <div className="absolute inset-0 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 transition-opacity duration-300 group-hover:opacity-0">
                    <span className={`w-3 h-3 rounded-full ${dialColorMap[product.dialColor] || ''}`}></span>
                    <span>{product.dialColor}</span>
                    <span className="text-gray-400 dark:text-gray-600 font-light">|</span>
                    <span>{product.strapType}</span>
                </div>
                {/* Button on hover */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <button 
                        onClick={handleBuyNow}
                        className="w-full h-full text-center bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-sm"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={handleWishlistToggle}
        className={`absolute top-4 right-4 bg-black/50 p-2 rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black ${isInWishlist ? 'text-yellow-500' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}
      >
        <HeartIcon filled={isInWishlist} />
      </button>
    </div>
  );
};

export default ProductCard;
