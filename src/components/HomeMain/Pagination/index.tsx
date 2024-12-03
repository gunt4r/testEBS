import React from 'react';

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalProducts / productsPerPage) },
    (_, i) => i + 1
  );

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={number === currentPage ? 'active' : ''}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
