import { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './Filters';
import Pagination from './Pagination';
import Sorting from './Sorting';
import style from './styleMain.module.css';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import CardProduct from '../CardProduct';
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: { rate: number };
  image: string;
}

const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { t } = useTranslation()
  const productsPerPage = 4;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_STORE}/products`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filterByCategory = (category: string) => {
    const filtered = products.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const filterByPrice = (range: [number, number]) => {
    const [min, max] = range;
    const filtered = products.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const sortProducts = (option: string) => {
    const sorted = [...filteredProducts];
    if (option === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === 'rating') {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    setFilteredProducts(sorted);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className={classNames(style['section-product__wrapper'])}>
      <div className={classNames(style['section-product'])}>
      <div>
        <Filters setCategory={filterByCategory} setPriceRange={filterByPrice} />
      </div>
      <div className={classNames(style['section-product__right-wrapper'])}>
        <div className={classNames(style['section-product__right-header'])}>
          <p className={classNames(style['section-product__right-header-length'])}>{products.length} {t("products")}</p>
          <Sorting sortProducts={sortProducts} />
        </div>
        <div className={classNames(style['section-product__cards'])}>
          {currentProducts.map((product) => (
            <CardProduct product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          setPage={setCurrentPage}
        />
      </div>
    </div>
    </div>
  );
};

export default Main;
