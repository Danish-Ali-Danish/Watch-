import React, { useState, useEffect, useContext } from 'react';
import { CartIcon, UserIcon, SearchIcon, MenuIcon, CloseIcon, HeartIcon, BellIcon, AdminIcon } from './Icons';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import { NotificationContext } from '../context/NotificationContext';
import NotificationDropdown from './NotificationDropdown';
import { AuthContext } from '../context/AuthContext';

const SearchOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { setRoute, setSearchTerm } = useContext(AppContext);
    const [input, setInput] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(input);
        setRoute({ page: 'shop' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <CloseIcon className="w-8 h-8" />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-2xl px-4">
                <h2 className="text-4xl text-center text-black dark:text-white mb-8">Search for a Timepiece</h2>
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 'Aetherium X7'"
                        className="w-full bg-transparent border-b-2 border-gray-400 dark:border-gray-600 text-black dark:text-white text-3xl text-center py-4 focus:outline-none focus:border-yellow-500 transition-colors"
                        autoFocus
                    />
                     <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-yellow-500">
                        <SearchIcon className="w-8 h-8" />
                    </button>
                </div>
            </form>
        </div>
    );
};


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setRoute, wishlist } = useContext(AppContext);
  const { cart } = useContext(CartContext);
  const { persistentNotifications } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemCount = wishlist.length;
  const unreadNotificationCount = persistentNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Shop", page: "shop" },
    { name: "About Us", page: "about" },
    { name: "Contact", page: "contact" },
  ] as const;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-md dark:shadow-none' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a onClick={() => setRoute({ page: 'home' })} className="text-3xl font-bold tracking-wider gold-gradient-text cursor-pointer">
            CHRONOVAULT
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.page} onClick={() => setRoute({ page: link.page })} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer">{link.name}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-4 md:space-x-6 text-gray-600 dark:text-gray-300">
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-black dark:hover:text-white transition-colors"><SearchIcon /></button>
            <ThemeToggle />
            <div className="relative">
                <button onClick={() => setIsNotificationsOpen(prev => !prev)} className="hover:text-black dark:hover:text-white transition-colors"><BellIcon /></button>
                {unreadNotificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotificationCount}
                    </span>
                )}
                 {isNotificationsOpen && <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />}
            </div>
            <button onClick={() => setRoute({ page: 'wishlist' })} className="relative hover:text-black dark:hover:text-white transition-colors">
              <HeartIcon />
               {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setRoute({ page: user ? 'dashboard' : 'auth' })} className="hover:text-black dark:hover:text-white transition-colors"><UserIcon /></button>
            {user && (
              <button onClick={() => setRoute({ page: 'admin' })} className="hover:text-black dark:hover:text-white transition-colors" title="Admin Panel">
                <AdminIcon />
              </button>
            )}
            <button onClick={() => setRoute({ page: 'cart' })} className="relative hover:text-black dark:hover:text-white transition-colors">
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="md:hidden hover:text-black dark:hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-sm py-4">
            <nav className="flex flex-col items-center space-y-4">
              {navLinks.map(link => (
                <a key={link.page} onClick={() => { setRoute({ page: link.page }); setIsMenuOpen(false); }} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer">{link.name}</a>
              ))}
            </nav>
          </div>
        )}
      </header>
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Header;