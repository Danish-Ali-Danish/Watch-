import React, { useState, useContext, useEffect } from 'react';
import { User } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: User;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
    const { addUser, updateUser } = useContext(AdminContext);
    
    const initialUserState: User = {
        name: '',
        email: '',
        phone: '',
        address: { street: '', city: '', state: '', zip: '', country: '' },
    };
    
    const [formData, setFormData] = useState<User>(user || initialUserState);

    useEffect(() => {
        setFormData(user || initialUserState);
    }, [user, isOpen]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({ ...prev, address: { ...prev.address, [addressField]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            updateUser(formData);
        } else {
            addUser(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col border border-yellow-800/50">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{user ? 'Edit User' : 'Add New User'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label>Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required/></div>
                        <div><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required disabled={!!user}/></div>
                        <div><label>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                        <div><label>Street</label><input type="text" name="address.street" value={formData.address.street} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                        <div><label>City</label><input type="text" name="address.city" value={formData.address.city} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                        <div><label>State</label><input type="text" name="address.state" value={formData.address.state} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                        <div><label>ZIP Code</label><input type="text" name="address.zip" value={formData.address.zip} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                        <div><label>Country</label><input type="text" name="address.country" value={formData.address.country} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" /></div>
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4 -m-6 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;