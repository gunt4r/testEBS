import React from 'react';

interface FiltersProps {
  filters: {
    category: string[];
    price: [number, number][];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string[];
      price: [number, number][];
    }>
  >;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.category.includes(category)
      ? filters.category.filter((cat) => cat !== category)
      : [...filters.category, category];
    setFilters({ ...filters, category: updatedCategories });
  };

  const handlePriceChange = (priceRange: [number, number]) => {
    const updatedPrices = filters.price.includes(priceRange)
      ? filters.price.filter((range) => range !== priceRange)
      : [...filters.price, priceRange];
    setFilters({ ...filters, price: updatedPrices });
  };

  return (
    <div>
      <h3>Filter by</h3>
      <div>
        <h4>Category</h4>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange("men's clothing")}
            />
            Men's Clothing
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange("women's clothing")}
            />
            Women's Clothing
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('jewelery')}
            />
            Jewelry
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('electronics')}
            />
            Electronics
          </label>
        </div>
      </div>
      <div>
        <h4>Price</h4>
        <div>
          <label>
            <input type="checkbox" onChange={() => handlePriceChange([0, 25])} />
            Under $25
          </label>
          <label>
            <input type="checkbox" onChange={() => handlePriceChange([25, 50])} />
            $25 - $50
          </label>
          <label>
            <input type="checkbox" onChange={() => handlePriceChange([50, 100])} />
            $50 - $100
          </label>
          <label>
            <input type="checkbox" onChange={() => handlePriceChange([100, 150])} />
            $100 - $150
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
