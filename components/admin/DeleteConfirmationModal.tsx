
import React from 'react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-md p-6 border border-red-500/50">
                <h2 className="text-2xl font-bold text-red-500">Confirm Deletion</h2>
                <p className="my-4 text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">{itemName}</span>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white font-bold rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
