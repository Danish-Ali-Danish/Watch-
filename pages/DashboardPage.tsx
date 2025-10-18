import React, { useState, useContext } from 'react';
import { userOrders, currentUser } from '../constants';
import { AppContext } from '../context/AppContext';
import { NotificationContext } from '../context/NotificationContext';
import { BellIcon, CheckCircleIcon } from '../components/Icons';
import type { Order } from '../types';
import { generateInvoicePDF } from '../utils/invoiceGenerator';
import { AuthContext } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('My Orders');
    const { setRoute } = useContext(AppContext);
    const { logout, user: authUser } = useContext(AuthContext); // Use user from AuthContext

    const statusColors = {
        Pending: 'bg-gray-500',
        Shipped: 'bg-blue-500',
        Delivered: 'bg-yellow-500',
    };
    
    const handleViewInvoice = (order: Order) => {
        if (authUser) {
            generateInvoicePDF(order, authUser);
        }
    };

    const ProfileInfoTab = () => {
        const [user, setUser] = useState(authUser); // Initialize with logged-in user
        const [isEditing, setIsEditing] = useState(false);
        
        if (!user) return null;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const keys = name.split('.');
            if (keys.length > 1 && keys[0] === 'address') {
                 setUser(prev => prev ? ({ ...prev, address: { ...prev.address, [keys[1]]: value } }) : null);
            } else {
                setUser(prev => prev ? ({ ...prev, [name]: value }) : null);
            }
        };

        return (
            <div>
                {isEditing ? (
                    <form className="space-y-4 text-gray-600 dark:text-gray-300">
                        <div><label className="block mb-1">Name</label><input name="name" value={user.name} onChange={handleChange} className="w-full p-2 bg-white dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"/></div>
                        <div><label className="block mb-1">Email</label><input name="email" value={user.email} onChange={handleChange} className="w-full p-2 bg-white dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"/></div>
                        <div><label className="block mb-1">Phone</label><input name="phone" value={user.phone} onChange={handleChange} className="w-full p-2 bg-white dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"/></div>
                         <div><label className="block mb-1">Street</label><input name="address.street" value={user.address.street} onChange={handleChange} className="w-full p-2 bg-white dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"/></div>
                        <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-yellow-500 text-black rounded">Save</button>
                    </form>
                ) : (
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.country}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 border border-yellow-500 text-yellow-500 rounded">Edit Profile</button>
                    </div>
                )}
            </div>
        );
    };

    const NotificationsTab = () => {
        const { persistentNotifications, markAsRead, markAllAsRead } = useContext(NotificationContext);
         const iconMap: { [key: string]: React.ReactNode } = {
            order: <BellIcon className="w-5 h-5 text-blue-500" />,
            promo: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
            info: <CheckCircleIcon className="w-5 h-5 text-gray-500" />,
        };
        const unreadCount = persistentNotifications.filter(n => !n.read).length;
        return (
            <div>
                <div className="flex justify-end mb-4">
                    {unreadCount > 0 && <button onClick={markAllAsRead} className="text-sm text-yellow-500 dark:text-yellow-400 hover:underline">Mark all as read</button>}
                </div>
                 <div className="space-y-3">
                    {persistentNotifications.map(n => (
                        <div key={n.id} onClick={() => markAsRead(n.id)} className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${n.read ? 'bg-white dark:bg-[#222] border-gray-200 dark:border-gray-700' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
                           <div className="flex-shrink-0 mt-1">
                             {iconMap[n.type] || <BellIcon className="w-5 h-5 text-gray-500" />}
                           </div>
                           <div className="flex-grow">
                                <p className="text-gray-800 dark:text-gray-200">{n.message}</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{n.timestamp}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleTabClick = (tab: string) => {
        if (tab === 'Logout') {
            logout();
        } else if (tab === 'Wishlist') {
            setRoute({ page: 'wishlist' });
        }
        else {
            setActiveTab(tab)
        }
    }

    const tabs = ['My Orders', 'Notifications', 'Profile Info', 'Address Book', 'Wishlist', 'Logout'];

    return (
        <div className="bg-white dark:bg-black pt-32">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8">My Account</h1>
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Tabs */}
                    <aside className="md:w-1/4">
                        <nav className="flex flex-col space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`p-4 rounded-md text-left text-lg font-semibold transition-colors ${activeTab === tab ? 'bg-yellow-500 text-black' : 'bg-gray-100 dark:bg-[#111] text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#222]'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content */}
                    <main className="md:w-3/4">
                        <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-gray-800 min-h-[400px]">
                            <h2 className="text-3xl font-bold mb-6">{activeTab}</h2>
                            
                            {activeTab === 'My Orders' && (
                                <div className="space-y-4">
                                    {userOrders.map(order => (
                                        <div key={order.id} className="bg-white dark:bg-[#222] p-4 rounded-lg flex flex-wrap justify-between items-center gap-4 border border-gray-200 dark:border-gray-700">
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">Order #{order.id}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Date: {order.date}</p>
                                            </div>
                                             <div>
                                                <p className="font-bold text-gray-900 dark:text-white">${order.total.toLocaleString()}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{order.items.length} item(s)</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                                                <button onClick={() => handleViewInvoice(order)} className="text-yellow-500 dark:text-yellow-400 hover:underline text-sm">View Invoice</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                             {activeTab === 'Notifications' && <NotificationsTab />}

                             {activeTab === 'Profile Info' && <ProfileInfoTab />}

                             {activeTab === 'Address Book' && authUser && (
                                <div className="text-gray-600 dark:text-gray-300">
                                     <p><strong>Default Shipping Address:</strong></p>
                                     <p>{authUser.address.street}</p>
                                     <p>{authUser.address.city}, {authUser.address.state} {authUser.address.zip}</p>
                                     <p>{authUser.address.country}</p>
                                     <button className="mt-4 px-4 py-2 border border-yellow-500 text-yellow-500 rounded">Edit Address</button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;