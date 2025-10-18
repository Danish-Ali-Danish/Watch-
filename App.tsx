
import React, { useContext, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider, NotificationContext } from './context/NotificationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationContainer from './components/NotificationContainer';
import ChatWidget from './components/ChatWidget';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import PromotionBanner from './components/PromotionBanner';


// Import all page components
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';

const PageRenderer: React.FC = () => {
  const { route, setRoute } = useContext(AppContext);
  const { user, isAuthLoading } = useContext(AuthContext);
  const { addToastNotification } = useContext(NotificationContext);

  useEffect(() => {
    // Protect routes that require authentication
    if (!isAuthLoading && !user && (route.page === 'dashboard' || route.page === 'wishlist' || route.page === 'admin')) {
        addToastNotification('Please sign in to access this page.', 'info');
        setRoute({ page: 'auth' });
    }
  }, [route.page, user, isAuthLoading, setRoute, addToastNotification]);

  // Prevent rendering protected pages while auth state is loading or if user is not logged in
  if (isAuthLoading || (!user && (route.page === 'dashboard' || route.page === 'wishlist' || route.page === 'admin'))) {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            {/* You can add a spinner here */}
        </div>
    );
  }

  let PageComponent;
  switch (route.page) {
    case 'home':
      PageComponent = <HomePage />;
      break;
    case 'shop':
      PageComponent = <ShopPage />;
      break;
    case 'product':
      PageComponent = <ProductDetailPage productId={route.productId} />;
      break;
    case 'cart':
      PageComponent = <CartPage />;
      break;
    case 'checkout':
      PageComponent = <CheckoutPage />;
      break;
    case 'about':
      PageComponent = <AboutPage />;
      break;
    case 'contact':
      PageComponent = <ContactPage />;
      break;
    case 'dashboard':
      PageComponent = <DashboardPage />;
      break;
    case 'wishlist':
        PageComponent = <WishlistPage />;
      break;
    case 'auth':
        PageComponent = <AuthPage />;
        break;
    case 'admin':
        PageComponent = <AdminPage />;
        break;
    default:
      PageComponent = <HomePage />;
  }
  
  const pageKey = `${route.page}-${route.productId || ''}-${JSON.stringify(route.filters) || ''}`;

  return (
      <div key={pageKey} className="animate-page-fade-in">
          {PageComponent}
      </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <NotificationProvider>
          <AuthProvider>
            <AdminProvider>
              <CartProvider>
                <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-200 min-h-screen flex flex-col transition-colors duration-300">
                  <PromotionBanner />
                  <Header />
                  <NotificationContainer />
                  <main className="flex-grow">
                    <PageRenderer />
                  </main>
                  <Footer />
                  <ChatWidget />
                </div>
              </CartProvider>
            </AdminProvider>
          </AuthProvider>
        </NotificationProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;