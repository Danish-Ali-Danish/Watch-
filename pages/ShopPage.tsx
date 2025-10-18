import React, { useState, useMemo, useContext, useEffect } from 'react';
import { allProducts } from '../constants';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { AppContext } from '../context/AppContext';
import { SearchIcon } from '../components/Icons';

const DEFAULT_FILTERS = {
  category: 'All',
  brand: 'All',
  material: 'All',
  dialColor: 'All',
  strapType: 'All',
  minPrice: 0,
  maxPrice: 10000,
  sort: 'Popularity'
};

const PRODUCTS_PER_PAGE = 9;

const ShopPage: React.FC = () => {
  const { searchTerm, setSearchTerm, route } = useContext(AppContext);

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: route.filters?.category || DEFAULT_FILTERS.category,
    brand: route.filters?.brand || DEFAULT_FILTERS.brand,
  });
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync local search with global search term (e.g., from header)
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);
  
  // Live search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300); // 300ms delay after user stops typing

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [localSearch, setSearchTerm]);

  // Reset to page 1 when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);


  const filterOptions = useMemo(() => ({
    brands: ['All', ...Array.from(new Set(allProducts.map(p => p.brand)))],
    categories: ['All', ...Array.from(new Set(allProducts.map(p => p.category)))],
    materials: ['All', ...Array.from(new Set(allProducts.map(p => p.material)))],
    dialColors: ['All', ...Array.from(new Set(allProducts.map(p => p.dialColor)))],
    strapTypes: ['All', ...Array.from(new Set(allProducts.map(p => p.strapType)))],
  }), []);

  const dialColorMap: { [key: string]: string } = {
    Black: 'bg-gray-800',
    White: 'bg-white border border-gray-300',
    Blue: 'bg-blue-600',
    Green: 'bg-green-600',
    All: 'bg-gradient-to-r from-gray-700 to-gray-500'
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let numericValue = name.includes('Price') ? Number(value) : value;
    
    setFilters(prev => {
        const newFilters = {...prev, [name]: numericValue};
        if (name === 'minPrice' && newFilters.minPrice > newFilters.maxPrice) {
            newFilters.maxPrice = newFilters.minPrice;
        }
        if (name === 'maxPrice' && newFilters.maxPrice < newFilters.minPrice) {
            newFilters.minPrice = newFilters.maxPrice;
        }
        return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setLocalSearch('');
    // setSearchTerm will be updated by the useEffect for localSearch
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
          if (!searchTerm) return true;
          const lowerSearch = searchTerm.toLowerCase();
          return p.name.toLowerCase().includes(lowerSearch) ||
                 p.brand.toLowerCase().includes(lowerSearch);
      })
      .filter(p => filters.category === 'All' || p.category === filters.category)
      .filter(p => filters.brand === 'All' || p.brand === filters.brand)
      .filter(p => filters.material === 'All' || p.material === filters.material)
      .filter(p => filters.dialColor === 'All' || p.dialColor === filters.dialColor)
      .filter(p => filters.strapType === 'All' || p.strapType === filters.strapType)
      .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
      .sort((a, b) => {
        switch (filters.sort) {
          case 'PriceLowToHigh': return a.price - b.price;
          case 'PriceHighToLow': return b.price - a.price;
          case 'Newest': return b.id - a.id;
          default: return b.reviews.length - a.reviews.length;
        }
      });
  }, [filters, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-black pt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Our Collection</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-1/4">
             <div className="p-6 bg-gray-50 dark:bg-[#111] rounded-lg border border-gray-200 dark:border-gray-800 sticky top-24">
                <div className="flex justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h3>
                  <button onClick={resetFilters} className="text-sm text-yellow-500 dark:text-yellow-400 hover:underline">Reset All</button>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-800">

                  <div className="py-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Sort By</h4>
                    <select name="sort" value={filters.sort} onChange={handleFilterChange} className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition">
                      <option value="Popularity">Popularity</option>
                      <option value="Newest">Newest</option>
                      <option value="PriceLowToHigh">Price: Low to High</option>
                      <option value="PriceHighToLow">Price: High to Low</option>
                    </select>
                  </div>

                  <div className="py-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Price Range</h4>
                    <div className="flex justify-between items-center text-yellow-500 dark:text-yellow-400 font-bold mb-3 text-lg">
                      <span>${filters.minPrice.toLocaleString()}</span>
                      <span>${filters.maxPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Min price</label>
                      <input type="range" name="minPrice" min="0" max="10000" step="100" value={filters.minPrice} onChange={handleFilterChange} className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 mb-2"/>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Max price</label>
                      <input type="range" name="maxPrice" min="0" max="10000" step="100" value={filters.maxPrice} onChange={handleFilterChange} className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"/>
                    </div>
                  </div>
                  
                  <div className="py-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Category</h4>
                    <div className="space-y-2">
                      {filterOptions.categories.map(cat => (
                          <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="category" value={cat} checked={filters.category === cat} onChange={() => setFilters(prev => ({...prev, category: cat}))} className="h-4 w-4 text-yellow-600 border-gray-400 dark:border-gray-600 focus:ring-yellow-500 bg-transparent" />
                              <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                          </label>
                      ))}
                    </div>
                  </div>

                   <div className="py-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Material</h4>
                    <div className="space-y-2">
                      {filterOptions.materials.map(mat => (
                          <label key={mat} className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="material" value={mat} checked={filters.material === mat} onChange={() => setFilters(prev => ({...prev, material: mat}))} className="h-4 w-4 text-yellow-600 border-gray-400 dark:border-gray-600 focus:ring-yellow-500 bg-transparent" />
                              <span className="text-gray-700 dark:text-gray-300">{mat}</span>
                          </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="py-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Brand</h4>
                    <select name="brand" value={filters.brand} onChange={handleFilterChange} className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition">
                       {filterOptions.brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="py-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Dial Color</h4>
                    <div className="flex gap-3 flex-wrap">
                      {filterOptions.dialColors.map(color => (
                        <div key={color} className="relative group">
                          <button 
                            onClick={() => setFilters(prev => ({ ...prev, dialColor: color }))}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${filters.dialColor === color ? 'border-yellow-500 scale-110 ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-[#111]' : 'border-gray-400 dark:border-gray-600'}`}
                            aria-label={`Filter by dial color: ${color}`}
                          >
                            <div className={`w-full h-full rounded-full ${dialColorMap[color] || 'bg-gray-500'}`}></div>
                          </button>
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                   <div className="pt-6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3">Strap Type</h4>
                    <select name="strapType" value={filters.strapType} onChange={handleFilterChange} className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition">
                       {filterOptions.strapTypes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                </div>
              </div>
          </aside>

          <main className="w-full md:w-3/4">
             <div className="mb-8 relative">
                <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Search watches by name or brand..."
                    className="w-full p-4 pl-12 bg-gray-50 dark:bg-[#111] border-2 border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
            </div>
            
            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-[#111] rounded-lg">
                    <h2 className="text-2xl text-gray-600 dark:text-gray-300">No products found.</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                     {searchTerm && (
                        <p className="text-gray-500 dark:text-gray-400 mt-4">Current search: <span className="font-bold text-yellow-500 dark:text-yellow-400">"{searchTerm}"</span></p>
                    )}
                </div>
            )}
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;