import { useState } from "react";
import style from "./styleSorting.module.css"
import classNames from "classnames";
type SortingProps = {
  sortProducts: (option: string) => void;
};

const Sorting = ({ sortProducts }: SortingProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('Sort by');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    sortProducts(value);
  };

  return (
    <div className={style['section-products__sort-container']}>
    <label htmlFor="sortingDropdown" className={style['section-products__sort-label']}>
      Sort by:
    </label>
    <select
      value={selectedOption}
      onChange={handleSelectChange}
      className={style['section-products__sort-dropdown']}
    >
      <option value="price-asc">Low to High</option>
      <option value="price-desc">High to Low</option>
      <option value="rating">Rating</option>
    </select>
  </div>
  );
};

export default Sorting;
