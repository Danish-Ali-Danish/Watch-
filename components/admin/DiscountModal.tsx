
import React, { useState, useContext } from 'react';
import { Coupon } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface DiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
    coupon?: Coupon;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, coupon }) => {
    const { addCoupon, updateCoupon } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        code: coupon?.code || '',
        type: coupon?.type || 'percentage',
        value: coupon?.value || 0,
        expiryDate: coupon?.expiryDate || '',
        isActive: coupon?.isActive ?? true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: (name === 'value') ? Number(value) : value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (coupon) {
            updateCoupon({ ...coupon, ...formData });
        } else {
            addCoupon(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-lg border border-yellow-800/50">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{coupon ? 'Edit Coupon' : 'Add New Coupon'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label>Coupon Code</label><input type="text" name="code" value={formData.code} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required/></div>
                        <div><label>Value</label><input type="number" name="value" value={formData.value} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required/></div>
                        <div><label>Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border"><option value="percentage">Percentage (%)</option><option value="fixed">Fixed Amount ($)</option></select></div>
                        <div><label>Expiry Date</label><input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required/></div>
                    </div>
                     <div className="flex items-center gap-2">
                        <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" />
                        <label htmlFor="isActive">Is Active</label>
                    </div>

                    <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-4 -m-6 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Coupon</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DiscountModal;
