
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Product } from '../../types';
import DataTable from './DataTable';
import ProductModal from './ProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductsView: React.FC = () => {
    const { products, deleteProduct } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setSelectedProduct(undefined);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.id);
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    const columns = [
        { header: 'Name', accessor: (p: Product) => p.name },
        { header: 'Brand', accessor: (p: Product) => p.brand },
        { header: 'Price', accessor: (p: Product) => `$${p.price.toLocaleString()}` },
        { header: 'Category', accessor: (p: Product) => p.category },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Products</h1>
                <button onClick={handleAddNew} className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md">
                    Add New Product
                </button>
            </div>

            <DataTable<Product>
                columns={columns}
                data={products}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
            />

            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                />
            )}

            {isDeleteModalOpen && productToDelete && (
                 <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    itemName={productToDelete.name}
                />
            )}
        </div>
    );
};

export default ProductsView;
