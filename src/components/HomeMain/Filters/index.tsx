import { useState } from 'react';
import style from './styleFilters.module.css';
import classNames from 'classnames';
type FiltersProps = {
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
};

const Filters = ({ setCategory, setPriceRange }: FiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activePriceRange, setActivePriceRange] = useState<
    [number, number] | null
  >(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCategory(category);
  };

  const handlePriceClick = (range: [number, number]) => {
    setActivePriceRange(range);
    setPriceRange(range);
  };
  return (
    <div>
      <h3 className={classNames(style['section-product__filter'])}>
        Filter by{' '}
      </h3>
      <hr className={classNames(style['section-product__line'])} />
      <h3 className={classNames(style['section-product__filter-subtitle'])}>
        Collection
      </h3>
      <div className={classNames(style['section-product__filter-options'])}>
        <button
          className={classNames(style['section-product__filter-option'], {
            [style['section-product__filter-option-active']]:
              activeCategory === "men's clothing",
          })}
          onClick={() => handleCategoryClick("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className={classNames(style['section-product__filter-option'], {
            [style['section-product__filter-option-active']]:
              activeCategory === "women's clothing",
          })}
          onClick={() => handleCategoryClick("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className={classNames(style['section-product__filter-option'], {
            [style['section-product__filter-option-active']]:
              activeCategory === 'jewelery',
          })}
          onClick={() => handleCategoryClick('jewelery')}
        >
          Jewelry
        </button>
        <button
          className={classNames(style['section-product__filter-option'], {
            [style['section-product__filter-option-active']]:
              activeCategory === 'electronics',
          })}
          onClick={() => handleCategoryClick('electronics')}
        >
          Electronics
        </button>
      </div>
      <h3 className={classNames(style['section-product__filter-subtitle'])}>
        Filter by Price
      </h3>
      <div className={classNames(style['section-product__filter-options'])}>
      <button
        className={classNames(
          style['section-product__filter-option'],
          { [style['section-product__filter-option-active']]: activePriceRange?.[0] === 0 && activePriceRange?.[1] === 25 }
        )}
        onClick={() => handlePriceClick([0, 25])}
      >
        $0 - $25
      </button>
      <button
        className={classNames(
          style['section-product__filter-option'],
          { [style['section-product__filter-option-active']]: activePriceRange?.[0] === 25 && activePriceRange?.[1] === 50 }
        )}
        onClick={() => handlePriceClick([25, 50])}
      >
        $25 - $50
      </button>
      </div>
    </div>
  );
};

export default Filters;
