import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center space-x-2 mt-12" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded transition-colors hover:enabled:bg-yellow-500 hover:enabled:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 border rounded transition-colors duration-300
            ${currentPage === number
              ? 'bg-yellow-500 text-black border-yellow-500'
              : 'bg-gray-200 dark:bg-[#222] border-gray-300 dark:border-gray-700 hover:bg-yellow-500 hover:text-black'
            }`
          }
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded transition-colors hover:enabled:bg-yellow-500 hover:enabled:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
