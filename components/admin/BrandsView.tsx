
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Brand } from '../../types';
import DataTable from './DataTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { BrandModal } from './BrandModal';

const BrandsView: React.FC = () => {
    const { brands, deleteBrand } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>(undefined);
    const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);

    const handleEdit = (brand: Brand) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setSelectedBrand(undefined);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (brand: Brand) => {
        setBrandToDelete(brand);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (brandToDelete) {
            deleteBrand(brandToDelete.id);
            setIsDeleteModalOpen(false);
            setBrandToDelete(null);
        }
    };

    const columns = [
        { header: 'Name', accessor: (b: Brand) => b.name },
        { header: 'Origin', accessor: (b: Brand) => b.origin },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Brands</h1>
                <button onClick={handleAddNew} className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">
                    Add New Brand
                </button>
            </div>

            <DataTable<Brand>
                columns={columns}
                data={brands}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && (
                <BrandModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    brand={selectedBrand}
                />
            )}

            {isDeleteModalOpen && brandToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName={brandToDelete.name}
                />
            )}
        </div>
    );
};

export default BrandsView;