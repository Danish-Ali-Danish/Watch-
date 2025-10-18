

export interface Route {
  page: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'about' | 'contact' | 'dashboard' | 'wishlist' | 'auth' | 'admin';
  productId?: number;
  filters?: {
    category?: 'Men' | 'Women' | 'Unisex' | string;
    brand?: string;
  };
};

export interface StrapOption {
  type: 'Bracelet' | 'Leather' | 'Rubber' | string;
  image: string;
}

export interface DialColorOption {
  type: 'Black' | 'White' | 'Blue' | 'Green' | string;
  image: string;
}

export interface Collection {
  name: string;
  image: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  gallery: string[];
  rating: number;
  reviews: Review[];
  description: string;
  specs: { [key: string]: string };
  category: 'Men' | 'Women' | 'Unisex' | string;
  material: 'Stainless Steel' | 'Titanium' | 'Gold' | 'Ceramic';
  dialColor: 'Black' | 'White' | 'Blue' | 'Green';
  strapType: 'Bracelet' | 'Leather' | 'Rubber';
  straps?: StrapOption[];
  dialColors?: DialColorOption[];
  stock: number;
}

export interface CartItem {
  id: string; // Unique identifier for product + strap + dial combo, e.g., "1-Leather-Black"
  product: Product;
  quantity: number;
  selectedStrap: StrapOption;
  selectedDialColor: DialColorOption;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  total: number;
  items: CartItem[];
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'order' | 'promo';
  message: string;
  productName?: string; // For toast notifications
  read?: boolean; // For persistent notifications
  timestamp?: string; // For persistent notifications
  link?: Route; // For persistent notifications
}

export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  origin: string;
}

export interface Coupon {
    id: string;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    expiryDate: string;
    isActive: boolean;
}

export interface Promotion {
    id: string;
    message: string;
    link?: string;
    isActive: boolean;
}