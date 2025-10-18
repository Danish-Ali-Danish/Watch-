
import React, { createContext, useState, ReactNode, useContext, useMemo } from 'react';
import type { Product, Order, User, Review, Category, Brand, Coupon, Promotion } from '../types';
import { allProducts, userOrders, currentUser, sampleCoupons, samplePromotions } from '../constants'; // Using mock data
import { NotificationContext } from './NotificationContext';

// For simplicity, we'll use a mock array of users and reviews for the admin panel.
const allUsers: User[] = [currentUser, { name: "Jane Doe", email: "jane.doe@example.com", phone: "+1 (555) 987-6543", address: { street: "123 Main St", city: "Anytown", state: "CA", zip: "12345", country: "USA" } }];
const allReviews: Review[] = allProducts.flatMap(p => p.reviews);


interface AdminContextType {
  products: Product[];
  orders: Order[];
  users: User[];
  reviews: Review[];
  categories: Category[];
  brands: Brand[];
  coupons: Coupon[];
  promotions: Promotion[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  updateStock: (productId: number, newStock: number) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userEmail: string) => void;
  updateReview: (review: Review) => void;
  deleteReview: (reviewId: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  addBrand: (brand: Omit<Brand, 'id'>) => void;
  updateBrand: (brand: Brand) => void;
  deleteBrand: (brandId: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (couponId: string) => void;
  addPromotion: (promotion: Omit<Promotion, 'id'>) => void;
  updatePromotion: (promotion: Promotion) => void;
  deletePromotion: (promotionId: string) => void;
}

export const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [orders, setOrders] = useState<Order[]>(userOrders);
  const [users, setUsers] = useState<User[]>(allUsers);
  const [reviews, setReviews] = useState<Review[]>(allReviews);
  const [coupons, setCoupons] = useState<Coupon[]>(sampleCoupons);
  const [promotions, setPromotions] = useState<Promotion[]>(samplePromotions);
  const { addToastNotification } = useContext(NotificationContext);

  const initialCategories = useMemo(() => {
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    return uniqueCategories.map(name => ({ id: name.toLowerCase(), name, description: `The ${name} collection.` }));
  }, []);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const initialBrands = useMemo(() => {
      const uniqueBrands = [...new Set(allProducts.map(p => p.brand))];
      return uniqueBrands.map(name => ({ id: name.toLowerCase(), name, origin: "Switzerland" }));
  }, []);
  const [brands, setBrands] = useState<Brand[]>(initialBrands);


  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    setProducts(prev => {
      const newProduct: Product = {
        ...productData,
        id: Date.now(), // Use timestamp for unique ID in this demo
        rating: 0,
        reviews: [],
      };
      return [...prev, newProduct];
    });
    addToastNotification('Product added successfully!', 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    addToastNotification('Product updated successfully!', 'success');
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToastNotification('Product deleted.', 'info');
  };

  const updateStock = (productId: number, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    addToastNotification('Stock updated successfully!', 'success');
  };

  // Order CRUD
  const updateOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    addToastNotification(`Order #${updatedOrder.id} updated.`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    addToastNotification(`Order #${orderId} deleted.`, 'info');
  };
  
  // User CRUD
  const addUser = (newUser: User) => {
    setUsers(prev => {
        if (prev.find(u => u.email === newUser.email)) {
            addToastNotification('User with this email already exists.', 'error');
            return prev;
        }
        addToastNotification(`User ${newUser.name} added.`, 'success');
        return [...prev, newUser];
    });
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.email === updatedUser.email ? updatedUser : u));
    addToastNotification('User updated successfully!', 'success');
  };

  const deleteUser = (userEmail: string) => {
    setUsers(prev => prev.filter(u => u.email !== userEmail));
    addToastNotification(`User ${userEmail} deleted.`, 'info');
  };
  
  // Review CRUD
  const updateReview = (updatedReview: Review) => {
    setReviews(prev => prev.map(r => r.id === updatedReview.id ? updatedReview : r));
    addToastNotification('Review updated successfully!', 'success');
  };

  const deleteReview = (reviewId: number) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    addToastNotification('Review deleted.', 'info');
  };

  // Category CRUD
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
      setCategories(prev => {
          const newCategory: Category = {
              ...categoryData,
              id: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
          };
          return [...prev, newCategory];
      });
      addToastNotification('Category added successfully!', 'success');
  };

  const updateCategory = (updatedCategory: Category) => {
      setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
      addToastNotification('Category updated successfully!', 'success');
  };

  const deleteCategory = (categoryId: string) => {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      addToastNotification('Category deleted.', 'info');
  };
  
  // Brand CRUD
  const addBrand = (brandData: Omit<Brand, 'id'>) => {
      setBrands(prev => {
          const newBrand: Brand = {
              ...brandData,
              id: brandData.name.toLowerCase().replace(/\s+/g, '-'),
          };
          return [...prev, newBrand];
      });
      addToastNotification('Brand added successfully!', 'success');
  };

  const updateBrand = (updatedBrand: Brand) => {
      setBrands(prev => prev.map(b => b.id === updatedBrand.id ? updatedBrand : b));
      addToastNotification('Brand updated successfully!', 'success');
  };

  const deleteBrand = (brandId: string) => {
      setBrands(prev => prev.filter(b => b.id !== brandId));
      addToastNotification('Brand deleted.', 'info');
  };
  
  // Coupon CRUD
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
      setCoupons(prev => {
          const newCoupon: Coupon = { ...couponData, id: couponData.code.toLowerCase() };
          return [...prev, newCoupon];
      });
      addToastNotification('Coupon added successfully!', 'success');
  };
  const updateCoupon = (updatedCoupon: Coupon) => {
      setCoupons(prev => prev.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
      addToastNotification('Coupon updated successfully!', 'success');
  };
  const deleteCoupon = (couponId: string) => {
      setCoupons(prev => prev.filter(c => c.id !== couponId));
      addToastNotification('Coupon deleted.', 'info');
  };

  // Promotion CRUD
  const addPromotion = (promoData: Omit<Promotion, 'id'>) => {
      setPromotions(prev => {
          const newPromo: Promotion = { ...promoData, id: Date.now().toString() };
          return [...prev, newPromo];
      });
      addToastNotification('Promotion added successfully!', 'success');
  };
  const updatePromotion = (updatedPromo: Promotion) => {
      setPromotions(prev => prev.map(p => p.id === updatedPromo.id ? updatedPromo : p));
      addToastNotification('Promotion updated successfully!', 'success');
  };
  const deletePromotion = (promoId: string) => {
      setPromotions(prev => prev.filter(p => p.id !== promoId));
      addToastNotification('Promotion deleted.', 'info');
  };

  return (
    <AdminContext.Provider value={{
        products, orders, users, reviews, categories, brands, coupons, promotions,
        addProduct, updateProduct, deleteProduct, updateStock,
        updateOrder, deleteOrder,
        addUser, updateUser, deleteUser,
        updateReview, deleteReview,
        addCategory, updateCategory, deleteCategory,
        addBrand, updateBrand, deleteBrand,
        addCoupon, updateCoupon, deleteCoupon,
        addPromotion, updatePromotion, deletePromotion,
    }}>
      {children}
    </AdminContext.Provider>
  );
};