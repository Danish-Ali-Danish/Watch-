
import React from 'react';
import { AppContext } from '../context/AppContext';

const Footer: React.FC = () => {
    const { setRoute } = React.useContext(AppContext);
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold gold-gradient-text mb-4">CHRONOVAULT</h3>
            <p className="text-gray-600 dark:text-gray-400">Timeless elegance, modern precision. The future of horology is here.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a onClick={() => setRoute({ page: 'home' })} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">Home</a></li>
              <li><a onClick={() => setRoute({ page: 'shop' })} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">Shop</a></li>
              <li><a onClick={() => setRoute({ page: 'about' })} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">About Us</a></li>
              <li><a onClick={() => setRoute({ page: 'contact' })} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Warranty</a></li>
              <li><a onClick={() => setRoute({ page: 'admin' })} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">Admin Panel</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h4>
            {/* Social icons here */}
            <p className="text-gray-600 dark:text-gray-400">Join our community.</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Chronovault. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;