import style from './styleCartMain.module.css';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext.tsx';
interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }
export default function CartMain() {
  const { t } = useTranslation();
  const { state, dispatch } = useCart();

  const handleIncreaseQuantity = (id: string) => {
    const cartItem = state.items.find((item: CartItem) => item.id === id);
    if (cartItem) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: cartItem.quantity + 1 },
      });
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const currentQuantity = state.items.find((item:CartItem) => item.id === id)?.quantity!;
    if (currentQuantity > 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: currentQuantity - 1 },
      });
    }
  };

  const handleRemoveProduct = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  return (
    <section className={classNames(style['section-cart'])}>
    <main className={classNames(style['section-cart__wrapper'])}>
      <p className={classNames(style['section-cart__wrapper-title'])}>{t('cart')}</p>
      {state.items.length === 0 ? (
        <p>{t('cart_empty')}</p>
      ) : (
        state.items.map((item: CartItem) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Цена: ${item.price}</p>
            <p>Количество: {item.quantity}</p>
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
            <button onClick={() => handleRemoveProduct(item.id)}>Удалить</button>
          </div>
        ))
      )}
      {state.items.length > 0 && (
        <button onClick={handleClearCart}>Очистить корзину</button>
      )}
    </main>
  </section>
  );
}
