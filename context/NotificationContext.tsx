import React, { createContext, useState, ReactNode, useCallback } from 'react';
import type { Notification } from '../types';
import { userNotifications } from '../constants';

interface NotificationContextType {
  toastNotifications: Notification[];
  addToastNotification: (message: string, type: Notification['type'], productName?: string) => void;
  removeToastNotification: (id: number) => void;
  persistentNotifications: Notification[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  toastNotifications: [],
  addToastNotification: () => {},
  removeToastNotification: () => {},
  persistentNotifications: [],
  markAsRead: () => {},
  markAllAsRead: () => {},
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastNotifications, setToastNotifications] = useState<Notification[]>([]);
  const [persistentNotifications, setPersistentNotifications] = useState<Notification[]>(userNotifications);

  const removeToastNotification = useCallback((id: number) => {
    setToastNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addToastNotification = useCallback((message: string, type: Notification['type'], productName?: string) => {
    const id = Date.now();
    setToastNotifications(prev => [...prev, { id, message, type, productName }]);

    setTimeout(() => {
      removeToastNotification(id);
    }, 5000); // Auto-dismiss after 5 seconds
  }, [removeToastNotification]);
  
  const markAsRead = (id: number) => {
    setPersistentNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setPersistentNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
    );
  };


  return (
    <NotificationContext.Provider value={{ 
        toastNotifications, 
        addToastNotification, 
        removeToastNotification,
        persistentNotifications,
        markAsRead,
        markAllAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};