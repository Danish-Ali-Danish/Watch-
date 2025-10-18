
import React, { useState, useContext } from 'react';
import { Category } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, category }) => {
    const { addCategory, updateCategory } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            updateCategory({ ...category, ...formData });
        } else {
            addCategory(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{category ? 'Edit Category' : 'Add New Category'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold">Category Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-2 bg-gray-50 dark:bg-[#222] rounded border"
                            required
                        />
                    </div>
                     <div>
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="w-full p-2 bg-gray-50 dark:bg-[#222] rounded border"
                        />
                    </div>
                     <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
};