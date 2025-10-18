
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Promotion } from '../../types';
import DataTable from './DataTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import PromotionModal from './PromotionModal';

const PromotionsView: React.FC = () => {
    const { promotions, deletePromotion } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | undefined>(undefined);
    const [promotionToDelete, setPromotionToDelete] = useState<Promotion | null>(null);

    const handleEdit = (promotion: Promotion) => {
        setSelectedPromotion(promotion);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setSelectedPromotion(undefined);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (promotion: Promotion) => {
        setPromotionToDelete(promotion);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (promotionToDelete) {
            deletePromotion(promotionToDelete.id);
            setIsDeleteModalOpen(false);
            setPromotionToDelete(null);
        }
    };

    const columns = [
        { header: 'Message', accessor: (p: Promotion) => <p className="max-w-md truncate">{p.message}</p> },
        { header: 'Link', accessor: (p: Promotion) => p.link ? <a href={p.link} className="text-blue-500 hover:underline">{p.link}</a> : 'None' },
        { header: 'Status', accessor: (p: Promotion) => (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {p.isActive ? 'Active' : 'Inactive'}
            </span>
        )},
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Promotions</h1>
                <button onClick={handleAddNew} className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">
                    Add New Promotion
                </button>
            </div>

            <DataTable<Promotion>
                columns={columns}
                data={promotions}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && (
                <PromotionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    promotion={selectedPromotion}
                />
            )}

            {isDeleteModalOpen && promotionToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName="this promotion"
                />
            )}
        </div>
    );
};

export default PromotionsView;
