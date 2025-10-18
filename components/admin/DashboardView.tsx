
import React, { useContext } from 'react';
import StatCard from './StatCard';
import { AdminContext } from '../../context/AdminContext';
import { trendingProducts } from '../../constants';

const DashboardView: React.FC = () => {
    const { orders, products, users } = useContext(AdminContext);

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const newOrders = orders.filter(o => o.status === 'Pending').length;

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Dashboard</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
                <StatCard title="Total Orders" value={orders.length.toString()} />
                <StatCard title="New Orders" value={newOrders.toString()} />
                <StatCard title="Total Products" value={products.length.toString()} />
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                    <div className="space-y-3">
                        {orders.slice(0, 5).map(order => (
                             <div key={order.id} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <div>
                                    <p className="font-bold">{order.id}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">${order.total.toLocaleString()}</p>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                        order.status === 'Delivered' ? 'bg-yellow-500/20 text-yellow-500' :
                                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500' :
                                        'bg-gray-500/20 text-gray-500'
                                    }`}>{order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold mb-4">Top Products</h2>
                    <div className="space-y-3">
                         {trendingProducts.slice(0, 5).map(product => (
                            <div key={product.id} className="flex items-center gap-4 text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md"/>
                                <div className="flex-grow">
                                    <p className="font-bold">{product.name}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{product.brand}</p>
                                </div>
                                <p className="font-bold">${product.price.toLocaleString()}</p>
                            </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
