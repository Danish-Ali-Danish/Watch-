import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Review } from '../../types';
import DataTable from './DataTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { StarIcon } from '../Icons';
import ReviewModal from './ReviewModal';

const ReviewsView: React.FC = () => {
    const { reviews, deleteReview } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | undefined>(undefined);
    const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

    const handleEdit = (review: Review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (review: Review) => {
        setReviewToDelete(review);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (reviewToDelete) {
            deleteReview(reviewToDelete.id);
            setReviewToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };
    
    const columns = [
        { header: 'Author', accessor: (r: Review) => r.author },
        { header: 'Comment', accessor: (r: Review) => <p className="truncate max-w-sm">{r.comment}</p> },
        { header: 'Rating', accessor: (r: Review) => (
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < r.rating} className="w-4 h-4" />
                ))}
            </div>
        )},
        { header: 'Date', accessor: (r: Review) => r.date },
    ];

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Manage Reviews</h1>
            <DataTable<Review>
                columns={columns}
                data={reviews}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && selectedReview && (
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    review={selectedReview}
                />
            )}

             {isDeleteModalOpen && reviewToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setReviewToDelete(null)}
                    onConfirm={confirmDelete}
                    itemName={`review by ${reviewToDelete.author}`}
                />
            )}
        </div>
    );
};

export default ReviewsView;