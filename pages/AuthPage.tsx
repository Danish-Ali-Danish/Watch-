import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { InfoIcon, CloseIcon } from '../components/Icons';

const AuthPage: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login } = useContext(AuthContext);
    const { setRoute } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInfoVisible(false);
        }, 10000); // Auto-hide after 10 seconds
        return () => clearTimeout(timer);
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (isLoginView) {
            await login(email, password);
        } else {
            // Mock signup
            setTimeout(() => {
                alert('Account created! Please sign in.');
                setIsLoginView(true);
                setIsLoading(false);
            }, 1000);
        }
        setIsLoading(false);
    };

    const handleAdminLogin = async () => {
        setIsLoading(true);
        const success = await login('alex.ryder@example.com', 'password123');
        if (success) {
            setRoute({ page: 'admin' });
        }
        setIsLoading(false);
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center pt-24 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/auth-bg/1920/1080)' }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative z-10 w-full max-w-md mx-auto">
                
                {isInfoVisible && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[calc(100%-2rem)] p-4 bg-gray-800/80 backdrop-blur-sm border border-yellow-800/50 rounded-lg shadow-lg flex items-start gap-3 transition-opacity duration-300">
                        <div className="flex-shrink-0 text-yellow-400 mt-0.5">
                            <InfoIcon className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-yellow-200/90 flex-grow">
                            If you want to save your order history, please sign up for an account. Otherwise, you can continue as a guest.
                        </p>
                        <button onClick={() => setIsInfoVisible(false)} className="flex-shrink-0 text-gray-500 hover:text-white transition-colors">
                            <CloseIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="p-8 bg-black/50 backdrop-blur-lg rounded-xl border border-yellow-800/30 text-white">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold gold-gradient-text mb-2">
                            {isLoginView ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-300">
                            {isLoginView ? 'Sign in to access your account' : 'Join the Chronovault family'}
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLoginView && (
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-400">Full Name</label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                                    required 
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-400">Email Address</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-400">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                                required
                            />
                            {isLoginView && <a href="#" className="text-xs text-yellow-400 hover:underline mt-1 block text-right">Forgot Password?</a>}
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            {isLoginView ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-yellow-400 hover:underline ml-2">
                                {isLoginView ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400 rounded-md">OR</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <button 
                            onClick={() => setRoute({ page: 'shop' })}
                            className="w-full py-3 border border-gray-600 text-gray-300 font-bold rounded-md transition-all duration-300 hover:bg-gray-700"
                        >
                            Continue as Guest
                        </button>
                        <button 
                            onClick={handleAdminLogin}
                            disabled={isLoading}
                            className="w-full py-3 border border-yellow-600 text-yellow-400 font-bold rounded-md transition-all duration-300 hover:bg-yellow-600 hover:text-black disabled:opacity-50"
                        >
                            Continue as Admin (Dev)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;