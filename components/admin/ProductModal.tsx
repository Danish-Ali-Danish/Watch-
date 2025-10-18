import React, { useState, useContext, useMemo } from 'react';
import { Product } from '../../types';
import { AdminContext } from '../../context/AdminContext';
import { CloseIcon } from '../Icons';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
    const { addProduct, updateProduct } = useContext(AdminContext);

    const initialSpecsString = useMemo(() => {
        if (!product?.specs) return '';
        return Object.entries(product.specs)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }, [product]);

    const [formData, setFormData] = useState({
        name: product?.name || '',
        brand: product?.brand || 'Chronovault',
        price: product?.price || 0,
        stock: product?.stock || 0,
        image: product?.image || 'https://picsum.photos/seed/new/600/600',
        gallery: product?.gallery || [],
        description: product?.description || '',
        specs: initialSpecsString, // Store specs as a string for the textarea
        category: product?.category || 'Men',
        material: product?.material || 'Stainless Steel',
        dialColor: product?.dialColor || 'Black',
        strapType: product?.strapType || 'Bracelet',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: (name === 'price' || name === 'stock') ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const specsObject = formData.specs.split('\n').reduce((acc, line) => {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            if (key && value) {
                acc[key.trim()] = value;
            }
            return acc;
        }, {} as { [key: string]: string });

        const finalProductData = {
            ...formData,
            specs: specsObject,
        };

        if (product) {
            updateProduct({ ...product, ...finalProductData });
        } else {
            // The context function expects certain fields to be omitted.
            const { rating, reviews, ...newProductData } = {
                ...finalProductData,
                rating: 0, // default value
                reviews: [], // default value
            };
            addProduct(newProductData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col border border-yellow-800/50">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600" required/></div>
                        <div><label>Brand</label><input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600" required/></div>
                        <div><label>Price</label><input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600" required/></div>
                        <div><label>Stock</label><input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600" required/></div>
                        <div className="md:col-span-2"><label>Image URL</label><input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600" required/></div>
                        <div><label>Category</label><select name="category" value={formData.category} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"><option>Men</option><option>Women</option><option>Unisex</option></select></div>
                        <div><label>Material</label><select name="material" value={formData.material} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"><option>Stainless Steel</option><option>Titanium</option><option>Gold</option><option>Ceramic</option></select></div>
                        <div><label>Dial Color</label><select name="dialColor" value={formData.dialColor} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"><option>Black</option><option>White</option><option>Blue</option><option>Green</option></select></div>
                        <div><label>Strap Type</label><select name="strapType" value={formData.strapType} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"><option>Bracelet</option><option>Leather</option><option>Rubber</option></select></div>
                    </div>
                    <div><label>Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600"></textarea></div>
                    <div><label>Specifications</label><p className="text-xs text-gray-500">Enter each spec on a new line, e.g., "Diameter: 42mm"</p><textarea name="specs" value={formData.specs} onChange={handleChange} rows={4} className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#222] rounded border border-gray-300 dark:border-gray-600 font-mono text-sm"></textarea></div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4 -m-6 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// FIX: Add default export for the component.
export default ProductModal;