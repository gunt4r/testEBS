import style from './styleCartProduct.module.css';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProductProps {
  product: Product;
  handleIncreaseQuantity: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
  handleRemoveProduct: (id: string) => void;
}

export default function CartProduct({
  product,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveProduct,
}: CartProductProps) {
  const { t } = useTranslation();

  return (
    <div className={classNames(style['section-cart__card-product'])}>
      <img
        className={classNames(style['section-cart__card-product-image'])}
        src={product.image}
        alt={product.title}
      />
      <div>
        <p className={classNames(style['section-cart__card-product-title'])}>
          {product.title}
        </p>
        <div className={classNames(style['section-cart__card-product-utils-wrapper'])}>
          <div className={classNames(style['section-cart__card-product-utils'])}>
            <button
              className={classNames(style['section-cart__card-product-utils-button'])}
              onClick={() => handleIncreaseQuantity(product.id)}
            >
              +
            </button>
            <p className={classNames(style['section-cart__card-product-utils-button'])} >
              {product.quantity}
            </p>
            <button
              className={classNames(style['section-cart__card-product-utils-button'])}
              onClick={() => handleDecreaseQuantity(product.id)}
            >
              -
            </button>
          </div>
          <p className={classNames(style['section-cart__card-product-title'])}>
            ${product.price}
          </p>
        </div>
        <div className={classNames(style['section-cart__card-product-bottom'])}>
          <a className={classNames(style['section-cart__card-product-move'])} href="/">{t('moveToFavorite')}</a>
          <button
            className={classNames(style['section-cart__card-product-move'])}
            onClick={() => handleRemoveProduct(product.id)}
          >
            {t('delete')}
          </button>
        </div>
      </div>
      <hr className={classNames(style['section-cart__card-product-line'])} />
    </div>
  );
}
