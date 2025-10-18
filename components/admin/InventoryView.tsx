
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Product } from '../../types';
import DataTable from './DataTable';
import { StockModal } from './StockModal';

const InventoryView: React.FC = () => {
    const { products } = useContext(AdminContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const handleEditStock = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const columns = [
        { header: 'Product Name', accessor: (p: Product) => p.name },
        { header: 'Brand', accessor: (p: Product) => p.brand },
        { header: 'Stock', accessor: (p: Product) => (
            <span className={`font-bold ${p.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                {p.stock}
            </span>
        )},
    ];

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Inventory Management</h1>
            
            <DataTable<Product>
                columns={columns}
                data={products}
                onEdit={handleEditStock}
            />

            {isModalOpen && selectedProduct && (
                <StockModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default InventoryView;