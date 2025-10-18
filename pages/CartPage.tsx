import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AppContext } from '../context/AppContext';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/Icons';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const { setRoute } = useContext(AppContext);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-32 container mx-auto text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => setRoute({ page: 'shop' })} className="px-10 py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black pt-32">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-50 dark:bg-[#111] p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div 
                    onClick={() => setRoute({ page: 'product', productId: item.product.id })} 
                    className="cursor-pointer flex-shrink-0"
                  >
                    <ImageWithSkeleton
                      src={item.selectedStrap.image}
                      alt={item.product.name}
                      wrapperClassName="w-24 h-24 rounded-md"
                      imgClassName="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow ml-4">
                    <h3 
                      className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                      onClick={() => setRoute({ page: 'product', productId: item.product.id })}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Strap: {item.selectedStrap.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dial: {item.selectedDialColor.type}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">${item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md mx-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><MinusIcon/></button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><PlusIcon/></button>
                  </div>
                  <p className="w-24 text-right font-bold text-gray-900 dark:text-white">${(item.product.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-400 dark:text-gray-500 hover:text-red-500"><TrashIcon/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Order Summary</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>${shipping.toLocaleString()}</span></div>
                 <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white"><span>Total</span><span>${total.toLocaleString()}</span></div>
              </div>
              <button onClick={() => setRoute({ page: 'checkout' })} className="w-full mt-8 px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;