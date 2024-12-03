import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import ProductList from './ProductList';
import Pagination from './Pagination';
import Sorting from './Sorting';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface FiltersState {
  category: string[];
  price: [number, number][];
}

const Main: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [sortOption, setSortOption] = useState<string>('bestseller');
  const [filters, setFilters] = useState<FiltersState>({
    category: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    if (filters.price.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        return filters.price.some((range) => price >= range[0] && price <= range[1]);
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSorting = (option: string) => {
    setSortOption(option);
    const sorted = [...filteredProducts];
    if (option === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === 'bestseller') {
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
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Sorting sortOption={sortOption} handleSorting={handleSorting} />
      <ProductList products={currentProducts} />
      <Pagination
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Main;
