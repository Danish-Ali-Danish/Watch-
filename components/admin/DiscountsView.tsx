
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Coupon } from '../../types';
import DataTable from './DataTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import DiscountModal from './DiscountModal';

const DiscountsView: React.FC = () => {
    const { coupons, deleteCoupon } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>(undefined);
    const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

    const handleEdit = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setSelectedCoupon(undefined);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (coupon: Coupon) => {
        setCouponToDelete(coupon);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (couponToDelete) {
            deleteCoupon(couponToDelete.id);
            setIsDeleteModalOpen(false);
            setCouponToDelete(null);
        }
    };

    const columns = [
        { header: 'Code', accessor: (c: Coupon) => <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{c.code}</span> },
        { header: 'Type', accessor: (c: Coupon) => c.type },
        { header: 'Value', accessor: (c: Coupon) => c.type === 'percentage' ? `${c.value}%` : `$${c.value}` },
        { header: 'Expires', accessor: (c: Coupon) => c.expiryDate },
        { header: 'Status', accessor: (c: Coupon) => (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {c.isActive ? 'Active' : 'Inactive'}
            </span>
        )},
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Discounts</h1>
                <button onClick={handleAddNew} className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">
                    Add New Coupon
                </button>
            </div>

            <DataTable<Coupon>
                columns={columns}
                data={coupons}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && (
                <DiscountModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    coupon={selectedCoupon}
                />
            )}

            {isDeleteModalOpen && couponToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName={`coupon "${couponToDelete.code}"`}
                />
            )}
        </div>
    );
};

export default DiscountsView;
