
import React, { useState, useContext, useEffect, useRef } from 'react';
import { allProducts } from '../constants';
import { StarIcon, HeartIcon, ShareIcon } from '../components/Icons';
import { CartContext } from '../context/CartContext';
import { AppContext } from '../context/AppContext';
import { NotificationContext } from '../context/NotificationContext';
import TrendingProducts from '../components/TrendingProducts';
import type { Review, StrapOption, DialColorOption } from '../types';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const ReviewSection: React.FC<{ initialReviews: Review[], productId: number }> = ({ initialReviews, productId }) => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [newReviewComment, setNewReviewComment] = useState('');

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReviewRating > 0 && newReviewComment.trim() !== '') {
            const newReview: Review = {
                id: Date.now(),
                author: "CurrentUser", // This would be dynamic in a real app
                rating: newReviewRating,
                comment: newReviewComment,
                date: new Date().toISOString().split('T')[0]
            };
            setReviews(prev => [newReview, ...prev]);
            setNewReviewRating(0);
            setNewReviewComment('');
        }
    };
    
    return (
        <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
            {/* Review Submission Form */}
            <form onSubmit={handleReviewSubmit} className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                <div className="flex items-center mb-4">
                    <span className="mr-4">Your Rating:</span>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                            <StarIcon key={star} filled={star <= newReviewRating} onClick={() => setNewReviewRating(star)} />
                        ))}
                    </div>
                </div>
                <textarea
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Share your thoughts on this timepiece..."
                    rows={4}
                    className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                ></textarea>
                <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Submit Review</button>
            </form>
            {/* Existing Reviews */}
            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <div className="flex items-center mb-2">
                                <div className="flex">{[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= review.rating} />)}</div>
                                <h4 className="font-bold text-gray-900 dark:text-white ml-4">{review.author}</h4>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{review.date}</p>
                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                    ))
                ) : <p className="text-gray-500">No reviews yet. Be the first!</p>}
            </div>
        </div>
    );
};


const ProductDetailPage: React.FC<{ productId?: number }> = ({ productId = 1 }) => {
  const product = allProducts.find(p => p.id === productId);
  const { addToCart } = useContext(CartContext);
  const { addToastNotification } = useContext(NotificationContext);
  const { setRoute, wishlist, addToWishlist, removeFromWishlist } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const LENS_WIDTH = 150;
  const LENS_HEIGHT = 150;
  const ZOOM_FACTOR = 2.5;

  if (!product) {
    return <div className="pt-32 text-center text-2xl">Product not found.</div>;
  }
  
  const defaultStrap = product.straps?.find(s => s.type === product.strapType) || { type: product.strapType, image: product.image };
  const defaultDial = product.dialColors?.find(d => d.type === product.dialColor) || { type: product.dialColor, image: product.image };
  
  const [selectedStrap, setSelectedStrap] = useState<StrapOption>(defaultStrap);
  const [selectedDialColor, setSelectedDialColor] = useState<DialColorOption>(defaultDial);
  const [activeImage, setActiveImage] = useState(product.image);
  
   useEffect(() => {
    setActiveImage(selectedStrap.image);
   }, [productId]);

  useEffect(() => {
    const updateDimensions = () => {
        if (imageContainerRef.current) {
            const rect = imageContainerRef.current.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
        }
    };
    
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateDimensions);
    };
  }, [activeImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };


  const isInWishlist = wishlist.includes(product.id);

  const handleWishlistToggle = () => {
      if (isInWishlist) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product.id);
      }
  };

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} filled={i <= rating} />);
    }
    return stars;
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedStrap, selectedDialColor);
    addToastNotification('Added to Cart!', 'success', `${product.name} (x${quantity})`);
  }
  
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedStrap, selectedDialColor);
    addToastNotification('Added to Cart!', 'success', `${product.name} (x${quantity})`);
    setTimeout(() => {
        setRoute({ page: 'checkout' });
    }, 500);
  };
  
  const dialColorMap: { [key: string]: string } = {
    Black: 'bg-gray-800',
    White: 'bg-white border border-gray-400',
    Blue: 'bg-blue-600',
    Green: 'bg-green-600',
  };

  let lensX = mousePosition.x - LENS_WIDTH / 2;
  let lensY = mousePosition.y - LENS_HEIGHT / 2;

  if (lensX < 0) lensX = 0;
  if (lensY < 0) lensY = 0;
  if (lensX > dimensions.width - LENS_WIDTH) lensX = dimensions.width - LENS_WIDTH;
  if (lensY > dimensions.height - LENS_HEIGHT) lensY = dimensions.height - LENS_HEIGHT;

  const bgPosX = -(lensX * ZOOM_FACTOR);
  const bgPosY = -(lensY * ZOOM_FACTOR);

  return (
    <div className="bg-white dark:bg-black pt-24 text-gray-900 dark:text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            <span onClick={() => setRoute({ page: 'home' })} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Home</span>
            <span className="mx-2">/</span>
            <span onClick={() => setRoute({ page: 'shop' })} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Shop</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-white font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image Gallery */}
          <div className="relative">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                  {/* Thumbnails */}
                  <div className="flex flex-row md:flex-col gap-2 justify-center md:justify-start">
                      {[product.image, ...product.gallery].slice(0, 5).map((img, index) => (
                          <div
                              key={index}
                              onClick={() => setActiveImage(img)}
                              className={`cursor-pointer border-2 rounded-md ${activeImage === img ? 'border-yellow-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'} transition-all`}
                          >
                              <ImageWithSkeleton
                                  src={img}
                                  alt={`${product.name} view ${index + 1}`}
                                  wrapperClassName="w-16 h-16 md:w-20 md:h-20"
                                  imgClassName="w-full h-full object-cover rounded-sm"
                              />
                          </div>
                      ))}
                  </div>

                  {/* Main Image */}
                  <div
                      ref={imageContainerRef}
                      onMouseEnter={() => setIsZoomVisible(true)}
                      onMouseLeave={() => setIsZoomVisible(false)}
                      onMouseMove={handleMouseMove}
                      className="relative flex-grow bg-gray-100 dark:bg-[#111] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 cursor-crosshair"
                  >
                      <ImageWithSkeleton
                          src={activeImage}
                          alt={`${product.name} with ${selectedStrap.type} strap and ${selectedDialColor.type} dial`}
                          wrapperClassName="aspect-square"
                          imgClassName="w-full h-full object-cover"
                      />
                      {/* Lens */}
                      <div style={{
                          position: 'absolute',
                          left: `${lensX}px`,
                          top: `${lensY}px`,
                          width: `${LENS_WIDTH}px`,
                          height: `${LENS_HEIGHT}px`,
                          border: '2px solid rgba(212, 175, 55, 0.8)',
                          background: 'rgba(255, 255, 255, 0.2)',
                          pointerEvents: 'none',
                          opacity: isZoomVisible && dimensions.width > 0 ? 1 : 0,
                          transition: 'opacity 0.2s ease',
                      }}/>
                  </div>
              </div>

              {/* Zoom Pane */}
              <div style={{
                  position: 'absolute',
                  left: 'calc(100% + 2rem)',
                  top: 0,
                  width: dimensions.width,
                  height: dimensions.height,
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                  backgroundSize: `${dimensions.width * ZOOM_FACTOR}px ${dimensions.height * ZOOM_FACTOR}px`,
                  border: '1px solid #444',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  opacity: isZoomVisible && dimensions.width > 0 ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  visibility: isZoomVisible && dimensions.width > 0 ? 'visible' : 'hidden',
              }} className="hidden lg:block"/>
          </div>


          {/* Product Info */}
          <div>
            <p className="text-yellow-500 dark:text-yellow-400 font-semibold">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-bold my-2">{product.name}</h1>
            <div className="flex items-center my-4">
              {renderStars(product.rating)}
              <span className="text-gray-500 dark:text-gray-400 ml-3">({product.reviews.length} reviews)</span>
            </div>
            <p className="text-4xl gold-gradient-text font-bold mb-6">${product.price.toLocaleString()}</p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{product.description}</p>
            
            {product.straps && product.straps.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Strap</h3>
                    <div className="flex gap-4">
                        {product.straps.map(strap => (
                            <div key={strap.type} onClick={() => { setSelectedStrap(strap); setActiveImage(strap.image); }} className={`cursor-pointer rounded-lg p-1 border-2 ${selectedStrap.type === strap.type ? 'border-yellow-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
                                <ImageWithSkeleton
                                  src={strap.image}
                                  alt={`${strap.type} strap`}
                                  wrapperClassName="w-20 h-20 rounded-md"
                                  imgClassName="w-full h-full object-cover rounded-md"
                                />
                                <p className="text-center text-sm mt-1">{strap.type}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
             {product.dialColors && product.dialColors.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Dial Color</h3>
                    <div className="flex gap-4 items-center">
                        {product.dialColors.map(dial => (
                            <div key={dial.type} onClick={() => { setSelectedDialColor(dial); setActiveImage(dial.image); }} className={`cursor-pointer rounded-full p-1 border-2 ${selectedDialColor.type === dial.type ? 'border-yellow-500' : 'border-gray-400 dark:border-gray-700 hover:border-gray-500'}`}>
                                <div className={`w-10 h-10 rounded-full ${dialColorMap[dial.type] || 'bg-gray-500'}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Key Specifications</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400 border-l-2 border-yellow-700 pl-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
                <li><strong>Strap Type:</strong> {selectedStrap.type}</li>
                <li><strong>Dial Color:</strong> {selectedDialColor.type}</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-4 py-3 text-lg font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md">-</button>
                    <span className="px-6 py-3 text-lg font-bold select-none">{quantity}</span>
                    <button onClick={() => setQuantity(q => q+1)} className="px-4 py-3 text-lg font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md">+</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button onClick={handleAddToCart} className="w-full px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105">
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="w-full px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold rounded-md text-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black">
                Buy Now
              </button>
            </div>
            
             <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                <button onClick={handleWishlistToggle} className={`flex items-center space-x-2 hover:text-black dark:hover:text-white transition-colors ${isInWishlist ? 'text-yellow-500' : ''}`}>
                  <HeartIcon filled={isInWishlist} />
                  <span>{isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-black dark:hover:text-white"><ShareIcon /><span>Share</span></button>
            </div>
          </div>
        </div>
        
        {/* Review Section */}
        <div className="mt-20">
            <ReviewSection initialReviews={product.reviews} productId={product.id} />
        </div>
      </div>
      <TrendingProducts />
    </div>
  );
};

export default ProductDetailPage;
