
import React, { createContext, useState, ReactNode } from 'react';
import type { Route } from '../types';

interface AppContextType {
  route: Route;
  setRoute: (route: Route) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  wishlist: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
}

export const AppContext = createContext<AppContextType>({
  route: { page: 'home' },
  setRoute: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [route, setInternalRoute] = useState<Route>({ page: 'home' });
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const setRoute = (newRoute: Route) => {
    setInternalRoute(newRoute);
    window.scrollTo(0, 0);
  };

  const addToWishlist = (productId: number) => {
    setWishlist(prev => {
        if (prev.includes(productId)) return prev;
        return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  return (
    <AppContext.Provider value={{ 
        route, 
        setRoute, 
        searchTerm, 
        setSearchTerm,
        wishlist,
        addToWishlist,
        removeFromWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
};
