
import React, { useState, useContext } from 'react';
import { Product } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface StockModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export const StockModal: React.FC<StockModalProps> = ({ isOpen, onClose, product }) => {
    const { updateStock } = useContext(AdminContext);
    const [stock, setStock] = useState<number>(product.stock);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateStock(product.id, stock);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-bold">Update Stock</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <p>Updating stock for: <span className="font-bold">{product.name}</span></p>
                    <div>
                        <label className="block mb-2 font-semibold">Stock Quantity</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className="w-full p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"
                            autoFocus
                        />
                    </div>
                     <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};