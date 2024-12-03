import React from 'react';

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

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <p>${product.price}</p>
          <p>⭐ {product.rating.rate}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
