
import React, { useState, useContext } from 'react';
import { Promotion } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    promotion?: Promotion;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, promotion }) => {
    const { addPromotion, updatePromotion } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        message: promotion?.message || '',
        link: promotion?.link || '',
        isActive: promotion?.isActive ?? false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
         if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (promotion) {
            updatePromotion({ ...promotion, ...formData });
        } else {
            addPromotion(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-lg border border-yellow-800/50">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{promotion ? 'Edit Promotion' : 'Add New Promotion'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div><label>Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required/></div>
                    <div><label>Link (Optional)</label><input type="text" name="link" value={formData.link} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="isActive" id="isPromoActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" />
                        <label htmlFor="isPromoActive">Is Active</label>
                    </div>

                    <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-4 -m-6 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Promotion</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromotionModal;
