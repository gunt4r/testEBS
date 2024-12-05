import style from './styleCartMain.module.css';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext.tsx';
import CartProduct from './CartProduct/index.tsx';
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}
export default function CartMain() {
  const { t } = useTranslation();
  const { state, dispatch, getTotalPrice } = useCart();
  const orderTotal = getTotalPrice(state.items).toFixed(2) + 10;
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
    const currentQuantity = state.items.find((item: CartItem) => item.id === id)
      ?.quantity!;
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
        <p className={classNames(style['section-cart__wrapper-title'])}>
          {t('cart')}
        </p>
        <div className={classNames(style['section-cart__wrappers'])}>
          <div className={classNames(style['section-cart__wrappers-left'])}>
            {state.items.length === 0 ? (
              <br />
            ) : (
              state.items.map((item: CartItem) => (
                <CartProduct
                  key={item.id}
                  product={item}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))
            )}
          </div>
          {state.items.length > 0 && (
            <>
              <section className={classNames(style['section-cart__checkout'])}>
                <p
                  className={classNames(style['section-cart__checkout-title'])}
                >
                  TOTAL
                </p>
                <div>
                  <div
                    className={classNames(
                      style['section-cart__checkout-wrapper']
                    )}
                  >
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      Subtotal
                    </p>
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                     ${getTotalPrice(state.items).toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={classNames(
                      style['section-cart__checkout-wrapper']
                    )}
                  >
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      Delivery
                    </p>
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      UNITED STATES
                    </p>
                  </div>
                  <div
                    className={classNames(
                      style['section-cart__checkout-wrapper']
                    )}
                  >
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      Estimated shipping
                    </p>
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      10$
                    </p>
                  </div>
                  <div
                    className={classNames(
                      style['section-cart__checkout-wrapper']
                    )}
                  >
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      ORDER TOTAL
                    </p>
                    <p
                      className={classNames(
                        style['section-cart__checkout-subtitle']
                      )}
                    >
                      {orderTotal}
                    </p>
                  </div>
                  <button className={classNames(
                        style['section-cart__wrapper-clear']
                      )}>CHECKOUT</button>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      {state.items.length > 0 && (
        <>
          <button
            className={classNames(style['section-cart__wrapper-clear'])}
            onClick={handleClearCart}
          >
            {t('clearCart')}
          </button>
        </>
      )}
    </section>
  );
}
