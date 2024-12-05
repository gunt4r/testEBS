import style from './styleCardProduct.module.css';
import classNames from 'classnames';
import { IoCartOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import { useCart } from '../../context/CartContext';
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: { rate: number };
  image: string;
}

interface CardProductProps {
  product: Product;
}
export default function CardProduct({ product }: CardProductProps) {
  const { t } = useTranslation()
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product, quantity: 1,
      },
    });
    toast.success(`${product.title} ${t("addToCart")}`);
  };
  return (
    <div
      className={classNames(style['section-product__card'])}
      key={product.id}
      
    >
      <Toaster position="bottom-right" />
      <img
        className={classNames(style['section-product__card-image'])}
        src={product.image}
        alt={product.title}
      />
      <div className={classNames(style['section-product__card-wrapper-title'])}>
        <h3 className={classNames(style['section-product__card-title'])}>
          {product.title}
        </h3>
        <button onClick={handleAddToCart}>
          <IoCartOutline
            className={classNames(style['section-product__card-cart-icon'])}
          />
        </button>
      </div>
      <div className={classNames(style['section-product__card-bottom'])}>
        <div
          className={classNames(style['section-product__card-wrapper-rating'])}
          style={{ color: 'rgb(255, 255, 0)' }}
        >
          <FaStar style={{ marginRight: '10px' }} />
          <p className={classNames(style['section-product__card-rating'])}>
            {' '}
            {product.rating.rate}
          </p>
        </div>
        <p className={classNames(style['section-product__card-price'])}>${product.price}</p>
      </div>
    </div>
  );
}
