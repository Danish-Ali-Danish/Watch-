
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Category } from '../../types';
import DataTable from './DataTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { CategoryModal } from './CategoryModal';

const CategoriesView: React.FC = () => {
    const { categories, deleteCategory } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setSelectedCategory(undefined);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            deleteCategory(categoryToDelete.id);
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
        }
    };

    const columns = [
        { header: 'Name', accessor: (c: Category) => c.name },
        { header: 'Description', accessor: (c: Category) => c.description },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Categories</h1>
                <button onClick={handleAddNew} className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">
                    Add New Category
                </button>
            </div>

            <DataTable<Category>
                columns={columns}
                data={categories}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && (
                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    category={selectedCategory}
                />
            )}

            {isDeleteModalOpen && categoryToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName={categoryToDelete.name}
                />
            )}
        </div>
    );
};

export default CategoriesView;