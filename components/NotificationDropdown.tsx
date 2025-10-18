import React, { useContext, useEffect, useRef } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { AppContext } from '../context/AppContext';
import { BellIcon, CheckCircleIcon } from './Icons'; // Assuming order/promo icons exist
import type { Notification } from '../types';

const NotificationDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { persistentNotifications, markAsRead, markAllAsRead } = useContext(NotificationContext);
    const { setRoute } = useContext(AppContext);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);
    
    const handleNotificationClick = (notification: Notification) => {
        markAsRead(notification.id);
        if (notification.link) {
            setRoute(notification.link);
        }
        onClose();
    };

    const handleViewAll = () => {
        setRoute({ page: 'dashboard' }); // In a real app, you might pass a state to open the right tab
        onClose();
    };
    
    const iconMap: { [key: string]: React.ReactNode } = {
        order: <BellIcon className="w-5 h-5 text-blue-500" />,
        promo: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        info: <CheckCircleIcon className="w-5 h-5 text-gray-500" />,
    };

    const unreadCount = persistentNotifications.filter(n => !n.read).length;

    return (
        <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && <button onClick={markAllAsRead} className="text-xs text-yellow-500 dark:text-yellow-400 hover:underline">Mark all as read</button>}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {persistentNotifications.length > 0 ? (
                    persistentNotifications.map(n => (
                        <div key={n.id} onClick={() => handleNotificationClick(n)} className={`flex items-start gap-3 p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${!n.read ? 'bg-yellow-500/10 dark:bg-yellow-500/10' : ''}`}>
                           <div className="flex-shrink-0 mt-1">
                             {iconMap[n.type] || <BellIcon className="w-5 h-5 text-gray-500" />}
                           </div>
                           <div className="flex-grow">
                                <p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.timestamp}</p>
                           </div>
                           {!n.read && <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>}
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-center text-gray-500">No new notifications.</p>
                )}
            </div>
            <div className="p-2 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-700">
                <button onClick={handleViewAll} className="w-full text-center text-sm font-semibold text-yellow-500 dark:text-yellow-400 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    View All Notifications
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;
