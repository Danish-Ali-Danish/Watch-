import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AppContext } from '../context/AppContext';
import { NotificationContext } from '../context/NotificationContext';
import { LockIcon } from '../components/Icons';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const CheckoutPage: React.FC = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { setRoute } = useContext(AppContext);
    const { addToastNotification } = useContext(NotificationContext);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '', name: '',
        address: '', city: '', country: '', zip: '',
        cardName: '', cardNumber: '', cardExpiry: '', cardCVC: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;
    
    const handlePlaceOrder = () => {
        const firstProductName = cart.length > 0 ? cart[0].product.name : undefined;
        addToastNotification(
            'Order Placed Successfully!', 
            'success', 
            firstProductName
        );
        clearCart();
        setRoute({ page: 'home' });
    };

    const progressWidth = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

    return (
        <div className="bg-white dark:bg-black pt-32">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">Secure Checkout</h1>
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-gray-800">
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                    <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-yellow-600 to-amber-400 rounded-full transition-all duration-500" style={{ width: progressWidth }}></div>
                                </div>
                                <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span>Customer Info</span>
                                    <span>Shipping & Payment</span>
                                    <span>Review</span>
                                </div>
                            </div>

                            {step === 1 && (
                                <section>
                                    <h2 className="text-2xl font-bold mb-6">1. Customer Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className="p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} className="p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <input type="text" name="address" placeholder="Street Address" onChange={handleInputChange} className="md:col-span-2 p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <input type="text" name="city" placeholder="City" onChange={handleInputChange} className="p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <input type="text" name="country" placeholder="Country" onChange={handleInputChange} className="p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <input type="text" name="zip" placeholder="ZIP / Postal Code" onChange={handleInputChange} className="p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                    </div>
                                    <button onClick={() => setStep(2)} className="w-full mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-md">Next: Shipping & Payment</button>
                                </section>
                            )}
                             {step === 2 && (
                                <section>
                                    <h2 className="text-2xl font-bold mb-6">2. Payment Details</h2>
                                    <div className="space-y-4">
                                        <input type="text" name="cardName" placeholder="Name on Card" onChange={handleInputChange} className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleInputChange} className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        <div className="flex gap-4">
                                            <input type="text" name="cardExpiry" placeholder="MM / YY" onChange={handleInputChange} className="w-1/2 p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                            <input type="text" name="cardCVC" placeholder="CVC" onChange={handleInputChange} className="w-1/2 p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(1)} className="w-full mt-6 px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-md">Back</button>
                                        <button onClick={() => setStep(3)} className="w-full mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-md">Next: Review</button>
                                    </div>
                                </section>
                            )}
                            {step === 3 && (
                                <section>
                                    <h2 className="text-2xl font-bold mb-6">3. Review & Confirm</h2>
                                    <div className="bg-white dark:bg-[#222] p-4 rounded-lg space-y-2 text-gray-600 dark:text-gray-300">
                                        <p><strong>Name:</strong> {formData.name}</p>
                                        <p><strong>Email:</strong> {formData.email}</p>
                                        <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.zip}, {formData.country}</p>
                                        <p><strong>Card:</strong> **** **** **** {formData.cardNumber.slice(-4)}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(2)} className="w-1/2 mt-6 px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-md">Back</button>
                                        <button onClick={handlePlaceOrder} className="w-1/2 mt-6 px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">Confirm & Place Order</button>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Your Order</h2>
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div 
                                            className="flex items-center gap-3 cursor-pointer group"
                                            onClick={() => setRoute({ page: 'product', productId: item.product.id })}
                                        >
                                            <ImageWithSkeleton
                                              src={item.selectedStrap.image}
                                              alt={item.product.name}
                                              wrapperClassName="w-12 h-12 rounded"
                                              imgClassName="w-full h-full object-cover rounded"
                                            />
                                            <div>
                                                <p className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">{item.product.name} <span className="text-gray-500 dark:text-gray-400">x{item.quantity}</span></p>
                                                <p className="text-xs text-gray-500">Strap: {item.selectedStrap.type}</p>
                                                <p className="text-xs text-gray-500">Dial: {item.selectedDialColor.type}</p>
                                            </div>
                                        </div>
                                        <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>${shipping.toLocaleString()}</span></div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white mt-2"><span>Total</span><span>${total.toLocaleString()}</span></div>
                            </div>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4"><LockIcon/> SSL Secure / 100% Safe Payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;