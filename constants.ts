
import type { Collection, Product, Testimonial, Order, Review, User, StrapOption, DialColorOption, Notification, Coupon, Promotion } from './types';

export const sampleReviews: Review[] = [
    { id: 1, author: "Alex R.", rating: 5, comment: "Absolutely stunning timepiece. The quality is exceptional and it feels amazing on the wrist.", date: "2023-11-15" },
    { id: 2, author: "Samantha B.", rating: 4, comment: "Beautiful watch, though the clasp was a bit stiff at first. Overall, very happy with my purchase.", date: "2023-10-22" },
    { id: 3, author: "Michael T.", rating: 5, comment: "A true work of art. I get compliments on it everywhere I go. Worth every penny.", date: "2023-09-01" },
];

export const collections: Collection[] = [
  { name: 'Classic', image: 'https://picsum.photos/seed/classicwatch/800/800' },
  { name: 'Chronograph', image: 'https://picsum.photos/seed/chronograph/800/800' },
  { name: 'Smart', image: 'https://picsum.photos/seed/smartwatch/800/800' },
];

export const allProducts: Product[] = [
  { 
    id: 1, name: 'Aetherium X7', brand: 'Chronovault', price: 2499, image: 'https://picsum.photos/seed/tp1/600/600',
    gallery: ['https://picsum.photos/seed/tp1-g1/1000/1000', 'https://picsum.photos/seed/tp1-g2/1000/1000', 'https://picsum.photos/seed/tp1-g3/1000/1000'],
    rating: 4.8, reviews: sampleReviews,
    description: "The Aetherium X7 Chronograph is a marvel of Swiss engineering, featuring a self-winding movement and a sapphire crystal face. A timeless piece for the modern connoisseur.",
    specs: { "Case Material": "316L Stainless Steel", "Diameter": "42mm", "Water Resistance": "100m", "Warranty": "5 Years" },
    category: 'Men', material: 'Stainless Steel', dialColor: 'Black', strapType: 'Bracelet',
    straps: [
        { type: 'Bracelet', image: 'https://picsum.photos/seed/tp1/600/600' },
        { type: 'Leather', image: 'https://picsum.photos/seed/tp1-leather/600/600' }
    ],
    dialColors: [
        { type: 'Black', image: 'https://picsum.photos/seed/tp1/600/600' },
        { type: 'Blue', image: 'https://picsum.photos/seed/tp1-blue-dial/600/600' }
    ],
    stock: 25,
  },
  { 
    id: 2, name: 'Stellaris Chrono', brand: 'Axiom', price: 3199, image: 'https://picsum.photos/seed/tp2/600/600',
    gallery: ['https://picsum.photos/seed/tp2-g1/1000/1000', 'https://picsum.photos/seed/tp2-g2/1000/1000'],
    rating: 4.9, reviews: sampleReviews.slice(0, 2),
    description: "Navigate the cosmos with the Stellaris Chrono. Its celestial-inspired design and high-precision movement make it a star in any collection.",
    specs: { "Case Material": "Titanium", "Diameter": "44mm", "Water Resistance": "200m", "Warranty": "7 Years" },
    category: 'Men', material: 'Titanium', dialColor: 'Blue', strapType: 'Bracelet',
    stock: 15,
  },
  { 
    id: 3, name: 'Odyssey Tourbillon', brand: 'Chronovault', price: 5500, image: 'https://picsum.photos/seed/tp3/600/600',
    gallery: ['https://picsum.photos/seed/tp3-g1/1000/1000'],
    rating: 5.0, reviews: [sampleReviews[2]],
    description: "A masterpiece of horology, the Odyssey Tourbillon features an exposed tourbillon cage, offering a glimpse into the heart of time.",
    specs: { "Case Material": "18k Rose Gold", "Diameter": "43mm", "Water Resistance": "50m", "Warranty": "Lifetime" },
    category: 'Men', material: 'Gold', dialColor: 'White', strapType: 'Leather',
    straps: [
        { type: 'Leather', image: 'https://picsum.photos/seed/tp3/600/600' },
        { type: 'Bracelet', image: 'https://picsum.photos/seed/tp3-bracelet/600/600' }
    ],
    dialColors: [
        { type: 'White', image: 'https://picsum.photos/seed/tp3/600/600' },
        { type: 'Black', image: 'https://picsum.photos/seed/tp3-black-dial/600/600' }
    ],
    stock: 8,
  },
  { 
    id: 4, name: 'Apex Diver Pro', brand: 'Helios', price: 1950, image: 'https://picsum.photos/seed/tp4/600/600',
    gallery: ['https://picsum.photos/seed/tp4-g1/1000/1000', 'https://picsum.photos/seed/tp4-g2/1000/1000'],
    rating: 4.7, reviews: [],
    description: "Built for the depths, the Apex Diver Pro is a robust and reliable companion for any underwater adventure. Features a helium escape valve.",
    specs: { "Case Material": "Stainless Steel", "Diameter": "45mm", "Water Resistance": "500m", "Warranty": "3 Years" },
    category: 'Unisex', material: 'Stainless Steel', dialColor: 'Black', strapType: 'Rubber',
    stock: 30,
  },
  { 
    id: 5, name: 'Luna Classic', brand: 'Chronovault', price: 1200, image: 'https://picsum.photos/seed/tp5/600/600',
    gallery: ['https://picsum.photos/seed/tp5-g1/1000/1000', 'https://picsum.photos/seed/tp5-g2/1000/1000'],
    rating: 4.6, reviews: sampleReviews.slice(1, 3),
    description: "Elegance in its purest form. The Luna Classic's minimalist design and mother-of-pearl dial make it a sophisticated choice for any occasion.",
    specs: { "Case Material": "Stainless Steel", "Diameter": "36mm", "Water Resistance": "30m", "Warranty": "2 Years" },
    category: 'Women', material: 'Stainless Steel', dialColor: 'White', strapType: 'Leather',
    stock: 45,
  },
  { 
    id: 6, name: 'Helios GMT', brand: 'Helios', price: 2800, image: 'https://picsum.photos/seed/tp6/600/600',
    gallery: ['https://picsum.photos/seed/tp6-g1/1000/1000'],
    rating: 4.8, reviews: [],
    description: "For the world traveler, the Helios GMT allows tracking of two time zones simultaneously. A perfect blend of function and style.",
    specs: { "Case Material": "Titanium", "Diameter": "41mm", "Water Resistance": "150m", "Warranty": "5 Years" },
    category: 'Men', material: 'Titanium', dialColor: 'Green', strapType: 'Bracelet',
    stock: 18,
  },
  { 
    id: 7, name: 'Nova Smart V2', brand: 'Axiom', price: 999, image: 'https://picsum.photos/seed/tp7/600/600',
    gallery: ['https://picsum.photos/seed/tp7-g1/1000/1000', 'https://picsum.photos/seed/tp7-g2/1000/1000'],
    rating: 4.5, reviews: [sampleReviews[0]],
    description: "Tradition meets technology. The Nova Smart V2 offers a classic watch face with a hidden OLED display for notifications, fitness tracking, and more.",
    specs: { "Case Material": "Ceramic", "Diameter": "44mm", "Water Resistance": "50m", "Warranty": "2 Years" },
    category: 'Unisex', material: 'Ceramic', dialColor: 'Black', strapType: 'Rubber',
    straps: [
        { type: 'Rubber', image: 'https://picsum.photos/seed/tp7/600/600' },
        { type: 'Leather', image: 'https://picsum.photos/seed/tp7-leather/600/600' }
    ],
    stock: 50,
  },
  { 
    id: 8, name: 'Eclipse Skeleton', brand: 'Chronovault', price: 4100, image: 'https://picsum.photos/seed/tp8/600/600',
    gallery: ['https://picsum.photos/seed/tp8-g1/1000/1000', 'https://picsum.photos/seed/tp8-g2/1000/1000'],
    rating: 4.9, reviews: sampleReviews.slice(0, 1),
    description: "A mesmerizing display of mechanical artistry. The Eclipse Skeleton watch reveals the intricate workings of its automatic movement.",
    specs: { "Case Material": "PVD Coated Steel", "Diameter": "43mm", "Water Resistance": "50m", "Warranty": "5 Years" },
    category: 'Men', material: 'Stainless Steel', dialColor: 'Black', strapType: 'Leather',
    stock: 12,
  },
];

export const trendingProducts = allProducts.slice(0, 8);

export const testimonials: Testimonial[] = [
    { id: 1, quote: "Chronovault isn't just a watch; it's a statement. The craftsmanship is simply unparalleled. I feel a sense of history and future on my wrist.", author: 'Alistair Finch', title: 'Vintage Collector' },
    { id: 2, quote: "From the boardroom to a weekend getaway, my Chronovault is the perfect companion. Its elegance is matched only by its reliability.", author: 'Eleonora Vance', title: 'CEO, Vance Industries' },
    { id: 3, quote: "The attention to detail is breathtaking. Holding it, you understand that this is more than timekeeping—it's art. A true heirloom piece.", author: 'Kenji Tanaka', title: 'Architect' },
];

export const userOrders: Order[] = [
    {
        id: 'CV789-1', date: '2023-10-15', status: 'Delivered', total: 2499,
        items: [{ 
            id: '1-Bracelet-Black', 
            product: allProducts[0], 
            quantity: 1, 
            selectedStrap: { type: 'Bracelet', image: allProducts[0].image },
            selectedDialColor: { type: 'Black', image: allProducts[0].image }
        }],
    },
    {
        id: 'CV789-2', date: '2023-11-20', status: 'Shipped', total: 1200,
        items: [{ 
            id: '5-Leather-White', 
            product: allProducts[4], 
            quantity: 1, 
            selectedStrap: { type: 'Leather', image: allProducts[4].image },
            selectedDialColor: { type: 'White', image: allProducts[4].image }
        }],
    },
    {
        id: 'CV789-3', date: '2024-01-05', status: 'Pending', total: 4198,
        items: [
            { 
                id: '2-Bracelet-Blue', 
                product: allProducts[1], 
                quantity: 1, 
                selectedStrap: { type: 'Bracelet', image: allProducts[1].image },
                selectedDialColor: { type: 'Blue', image: allProducts[1].image } 
            },
            { 
                id: '7-Rubber-Black', 
                product: allProducts[6], 
                quantity: 1, 
                selectedStrap: { type: 'Rubber', image: allProducts[6].image },
                selectedDialColor: { type: 'Black', image: allProducts[6].image }
            }
        ],
    }
];

export const currentUser: User = {
    name: "Alex Ryder",
    email: "alex.ryder@example.com",
    phone: "+1 (555) 123-4567",
    address: {
        street: "42 Wallaby Way",
        city: "Sydney",
        state: "NSW",
        zip: "2000",
        country: "Australia"
    }
};

export const userNotifications: Notification[] = [
    { id: 101, type: 'order', message: 'Your order #CV789-2 has been shipped!', read: false, timestamp: '2 hours ago', link: { page: 'dashboard' } },
    { id: 102, type: 'promo', message: 'New arrivals in the Chronograph collection.', read: false, timestamp: '1 day ago', link: { page: 'shop' } },
    { id: 103, type: 'order', message: 'Your order #CV789-1 was successfully delivered.', read: true, timestamp: '3 days ago', link: { page: 'dashboard' } },
    { id: 104, type: 'info', message: 'Your profile information has been updated.', read: true, timestamp: '5 days ago', link: { page: 'dashboard' } },
];

export const sampleCoupons: Coupon[] = [
    { id: 'summer20', code: 'SUMMER20', type: 'percentage', value: 20, expiryDate: '2024-08-31', isActive: true },
    { id: 'welcome100', code: 'WELCOME100', type: 'fixed', value: 100, expiryDate: '2024-12-31', isActive: true },
    { id: 'olddeal', code: 'OLDDEAL', type: 'percentage', value: 15, expiryDate: '2023-01-01', isActive: false },
];

export const samplePromotions: Promotion[] = [
    { id: 'freeship', message: 'Free express shipping on all orders over $2,000!', isActive: true, link: '#' },
    { id: 'newcollection', message: 'The new Axiom collection has arrived. Discover now.', isActive: false, link: '#' },
];