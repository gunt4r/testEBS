import React from 'react';

interface SortingProps {
  sortOption: string;
  handleSorting: (option: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ sortOption, handleSorting }) => {
  return (
    <div>
      <h4>Sort by:</h4>
      <select
        value={sortOption}
        onChange={(e) => handleSorting(e.target.value)}
      >
        <option value="bestseller">Bestseller</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;
