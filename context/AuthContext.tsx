import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import type { User } from '../types';
import { currentUser } from '../constants'; // Using mock user for demo
import { AppContext } from './AppContext';
import { NotificationContext } from './NotificationContext';

interface AuthContextType {
  user: User | null;
  isAuthLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthLoading: true,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { setRoute } = useContext(AppContext);
  const { addToastNotification } = useContext(NotificationContext);

  useEffect(() => {
    // Check for persisted login state on mount
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Could not access local storage", error);
    } finally {
        setIsAuthLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Mock API call
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real app, you'd validate credentials against a backend
            if (email === 'alex.ryder@example.com' && pass === 'password123') {
                setUser(currentUser);
                localStorage.setItem('isLoggedIn', 'true');
                addToastNotification(`Welcome back, ${currentUser.name}!`, 'success');
                setRoute({ page: 'dashboard' });
                resolve(true);
            } else {
                addToastNotification('Invalid email or password.', 'error');
                resolve(false);
            }
        }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    addToastNotification("You've been signed out.", 'info');
    setRoute({ page: 'home' });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};