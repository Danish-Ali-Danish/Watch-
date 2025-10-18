import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { User } from '../../types';
import DataTable from './DataTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UserModal from './UserModal';

const UsersView: React.FC = () => {
    const { users, deleteUser } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setSelectedUser(undefined);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete.email);
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };
    
    const columns = [
        { header: 'Name', accessor: (u: User) => u.name },
        { header: 'Email', accessor: (u: User) => u.email },
        { header: 'Phone', accessor: (u: User) => u.phone },
        { header: 'Country', accessor: (u: User) => u.address.country },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Users</h1>
                 <button onClick={handleAddNew} className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">
                    Add New User
                </button>
            </div>
            <DataTable<User>
                columns={columns}
                data={users}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />
            
            {isModalOpen && (
                <UserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                />
            )}

             {isDeleteModalOpen && userToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName={userToDelete.name}
                />
            )}
        </div>
    );
};

export default UsersView;