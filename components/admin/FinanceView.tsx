
import React, { useContext } from 'react';
import StatCard from './StatCard';
import { AdminContext } from '../../context/AdminContext';

const FinanceView: React.FC = () => {
    const { orders } = useContext(AdminContext);

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Financial Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
                <StatCard title="Total Orders" value={orders.length.toString()} />
                <StatCard title="Average Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
                <StatCard title="Tickets" value="0" />
            </div>

            <div className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/40">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 10).map(order => (
                                <tr key={order.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="p-3 font-mono">{order.id}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                            order.status === 'Delivered' ? 'bg-yellow-500/20 text-yellow-500' :
                                            order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500' :
                                            'bg-gray-500/20 text-gray-500'
                                        }`}>{order.status}</span>
                                    </td>
                                    <td className="p-3 text-right font-bold">${order.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinanceView;