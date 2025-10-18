

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import ProductsView from './ProductsView';
import OrdersView from './OrdersView';
import UsersView from './UsersView';
import ReviewsView from './ReviewsView';
import InventoryView from './InventoryView';
import CategoriesView from './CategoriesView';
import BrandsView from './BrandsView';
import FinanceView from './FinanceView';
import DiscountsView from './DiscountsView';
import PromotionsView from './PromotionsView';

export type AdminView = 'dashboard' | 'products' | 'orders' | 'users' | 'reviews' | 'inventory' | 'categories' | 'brands' | 'finance' | 'discounts' | 'promotions';

const AdminLayout: React.FC = () => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView />;
            case 'products':
                return <ProductsView />;
            case 'orders':
                return <OrdersView />;
            case 'users':
                return <UsersView />;
             case 'reviews':
                return <ReviewsView />;
            case 'inventory':
                return <InventoryView />;
            case 'categories':
                return <CategoriesView />;
            case 'brands':
                return <BrandsView />;
            case 'finance':
                return <FinanceView />;
            case 'discounts':
                return <DiscountsView />;
            case 'promotions':
                return <PromotionsView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="flex">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-grow p-8 ml-64 bg-gray-50 dark:bg-[#0a0a0a]">
                {renderView()}
            </main>
        </div>
    );
};

export default AdminLayout;