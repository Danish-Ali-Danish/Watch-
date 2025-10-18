import React, { useState, useContext } from 'react';
import { Review } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon, StarIcon } from '../Icons';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: Review;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, review }) => {
    const { updateReview } = useContext(AdminContext);
    const [formData, setFormData] = useState<Review>(review);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (newRating: number) => {
        setFormData(prev => ({ ...prev, rating: newRating }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateReview(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-xl border border-yellow-800/50">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-bold">Edit Review</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div><label>Author</label><input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border" required/></div>
                    <div>
                        <label className="block mb-2">Rating</label>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                                <StarIcon key={star} filled={star <= formData.rating} onClick={() => handleRatingChange(star)} className="w-6 h-6"/>
                            ))}
                        </div>
                    </div>
                    <div><label>Comment</label><textarea name="comment" value={formData.comment} onChange={handleChange} rows={5} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border"></textarea></div>
                    <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-4 -m-6 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;