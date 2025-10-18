import React, { useEffect, useState } from 'react';
import type { Notification } from '../types';
import { CheckCircleIcon, CloseIcon } from './Icons';

interface NotificationToastProps {
  notification: Notification;
  onDismiss: (id: number) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Allow time for fade-out animation before removing from DOM
    setTimeout(() => onDismiss(notification.id), 300);
  };
  
  const iconMap: { [key: string]: React.ReactNode } = {
      success: <CheckCircleIcon className="w-6 h-6 text-yellow-500" />,
      // Add more icons for error, info etc. later if needed
  };

  return (
    <div
      className={`relative w-full max-w-sm p-4 my-2 rounded-lg shadow-lg border-l-4 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} bg-white dark:bg-[#1a1a1a] border-yellow-500`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {iconMap[notification.type]}
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {notification.message}
          </p>
          {notification.productName && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {notification.productName}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleDismiss}
            className="inline-flex rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <span className="sr-only">Close</span>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;