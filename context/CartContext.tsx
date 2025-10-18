
import React, { createContext, useState, ReactNode } from 'react';
import type { CartItem, Product, StrapOption, DialColorOption } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedStrap: StrapOption, selectedDialColor: DialColorOption) => void;
  updateQuantity: (cartId: string, newQuantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, selectedStrap: StrapOption, selectedDialColor: DialColorOption) => {
    const cartId = `${product.id}-${selectedStrap.type}-${selectedDialColor.type}`;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === cartId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id: cartId, product, quantity, selectedStrap, selectedDialColor }];
    });
  };

  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (cartId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
