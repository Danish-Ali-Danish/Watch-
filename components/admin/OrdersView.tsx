
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Order } from '../../types';
import DataTable from './DataTable';
import { OrderModal } from './OrderModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export const OrdersView: React.FC = () => {
    const { orders, deleteOrder } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (order: Order) => {
        setOrderToDelete(order);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (orderToDelete) {
            deleteOrder(orderToDelete.id);
            setIsDeleteModalOpen(false);
            setOrderToDelete(null);
        }
    };

    const columns = [
        { header: 'Order ID', accessor: (o: Order) => <span className="font-mono">{o.id}</span> },
        { header: 'Date', accessor: (o: Order) => o.date },
        { header: 'Total', accessor: (o: Order) => `$${o.total.toLocaleString()}` },
        { header: 'Status', accessor: (o: Order) => (
             <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                o.status === 'Delivered' ? 'bg-yellow-500/20 text-yellow-500' :
                o.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500' :
                'bg-gray-500/20 text-gray-500'
            }`}>{o.status}</span>
        )},
    ];

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Manage Orders</h1>
            <DataTable<Order>
                columns={columns}
                data={orders}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && selectedOrder && (
                <OrderModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                />
            )}
            
            {isDeleteModalOpen && orderToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName={`Order #${orderToDelete.id}`}
                />
            )}
        </div>
    );
};

export default OrdersView;
