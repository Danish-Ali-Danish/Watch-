
import React, { useState, useContext } from 'react';
import { Brand } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface BrandModalProps {
    isOpen: boolean;
    onClose: () => void;
    brand?: Brand;
}

export const BrandModal: React.FC<BrandModalProps> = ({ isOpen, onClose, brand }) => {
    const { addBrand, updateBrand } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        name: brand?.name || '',
        origin: brand?.origin || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (brand) {
            updateBrand({ ...brand, ...formData });
        } else {
            addBrand(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{brand ? 'Edit Brand' : 'Add New Brand'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold">Brand Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-2 bg-gray-50 dark:bg-[#222] rounded border"
                            required
                        />
                    </div>
                     <div>
                        <label className="block mb-2 font-semibold">Country of Origin</label>
                        <input
                            type="text"
                            value={formData.origin}
                            onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                            className="w-full p-2 bg-gray-50 dark:bg-[#222] rounded border"
                        />
                    </div>
                     <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Brand</button>
                    </div>
                </form>
            </div>
        </div>
    );
};