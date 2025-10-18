

import React from 'react';
import { DashboardIcon, ProductsIcon, OrdersIcon, UsersIcon, ReviewsIcon, InventoryIcon, CategoryIcon, BrandIcon, FinanceIcon, DiscountIcon, PromotionIcon } from './AdminIcons';
import { AppContext } from '../../context/AppContext';
import type { AdminView } from './AdminLayout';

interface SidebarProps {
    activeView: AdminView;
    setActiveView: (view: AdminView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
    const { setRoute } = React.useContext(AppContext);

    const navItems = [
        { name: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { name: 'products', label: 'Products', icon: <ProductsIcon /> },
        { name: 'inventory', label: 'Inventory', icon: <InventoryIcon /> },
        { name: 'orders', label: 'Orders', icon: <OrdersIcon /> },
        { name: 'categories', label: 'Categories', icon: <CategoryIcon /> },
        { name: 'brands', label: 'Brands', icon: <BrandIcon /> },
        { name: 'users', label: 'Users', icon: <UsersIcon /> },
        { name: 'reviews', label: 'Reviews', icon: <ReviewsIcon /> },
        { name: 'discounts', label: 'Discounts', icon: <DiscountIcon /> },
        { name: 'promotions', label: 'Promotions', icon: <PromotionIcon /> },
        { name: 'finance', label: 'Finance', icon: <FinanceIcon /> },
    ] as const;

    return (
        <aside className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <a onClick={() => setRoute({ page: 'home' })} className="text-2xl font-bold tracking-wider gold-gradient-text cursor-pointer">
                    CHRONOVAULT
                </a>
                <span className="block text-xs text-yellow-500">Admin Panel</span>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.name}
                        onClick={() => setActiveView(item.name)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                            activeView === item.name
                                ? 'bg-yellow-500 text-black'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;