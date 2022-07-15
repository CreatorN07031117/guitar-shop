import {useState, useRef, useEffect, FormEvent} from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {changeOrderList, getOrderList, setCoupon, getCoupon} from '../../store/cart-process/cart-process';
import {postNewOrder, postCoupon} from '../../store/api-actions';
import CartItem from './components/cart-item/cart-item';
import DeleteItemPopup from './components/delete-item-popup/delete-item-popup';
import {AppRoute} from '../../const';
import {NewOrder} from '../../types/data-types';
import style from './cart.module.css';
import '../app/app.module.css';


function Cart(): JSX.Element {
  const [selectGuitarId, setSelectGuitarId] = useState <null | number> (null);

  const couponRef = useRef(null);

  const {orderList, coupon} = useAppSelector(({CART}) => CART);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCoupon({
      isValid: null,
      persent: 0,
    }));
    dispatch(getCoupon());
  },[dispatch]);

  let totalAmmount = 0;
  orderList.map((item) => totalAmmount = totalAmmount + item.guitar.price * item.count);

  let discount = 0;

  if(coupon.persent > 0 && totalAmmount > 0) {
    discount = -totalAmmount * coupon.persent / 100;
  }
  const payment = totalAmmount + discount;

  const handleSubmitNewOrder = (newOrder: NewOrder) => {
    dispatch(postNewOrder(newOrder));
  };

  const handleSubmitCoupon = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const couponText = new FormData(couponRef.current as unknown as HTMLFormElement).get('coupon');
    dispatch(postCoupon({coupon: couponText as string}));
  };


  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.pageContent}>
        <div className={style.container}>
          <h1 className={style.pageTitle}>Корзина</h1>
          <ul className={style.breadcrumbsOnCart}>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Index}>Главная</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <span className={style.link}>Корзина</span>
            </li>
          </ul>
          <div className={style.cart}>
            {orderList.length === 0?
              (<p>Вы не добавили товары в корзину</p>) :
              (orderList.map((item, id) => (
                <CartItem
                  key={item.guitar.name}
                  guitar={item.guitar}
                  count={item.count}
                  isChangeQuantity={(count: number) => {
                    const updateOrderList=[...orderList];
                    updateOrderList[id] = {guitar: item.guitar, count: count};
                    dispatch(changeOrderList(updateOrderList));
                    dispatch(getOrderList());
                  }}
                  isDeleteItem={(itemId) => setSelectGuitarId(itemId)}
                />
              )))}
            <div className={style.cartFooter}>
              <div className={style.coupon}>
                <h2 className={style.couponTitle}>Промокод на скидку</h2>
                <p className={style.couponInfo}>Введите свой промокод, если он у вас есть.</p>
                <form
                  className={style.couponForm}
                  id="coupon-form"
                  method="post"
                  ref={couponRef}
                  onSubmit={(evt) => {handleSubmitCoupon(evt);}}
                >
                  <div className={style.couponInput}>
                    <label className={style.visuallyHidden}>Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                    />
                    {coupon.isValid !== null?
                      (
                        <p className={coupon.isValid? style.formMessageSuccess : style.formMessageError}>
                          {coupon.isValid? 'Промокод принят' : 'Неверный промокод'}
                        </p>
                      ): null}
                  </div>
                  <button
                    className={style.buttonPromo}
                    type="submit"
                  >
                    Применить
                  </button>
                </form>
              </div>
              <div className={style.cartTotalInfo}>
                <p className={style.cartTotalItem}>
                  <span className={style.cartTotalValueName}>Всего:</span>
                  <span className={style.cartTotalValue}>{totalAmmount.toLocaleString()} ₽</span>
                </p>
                <p className={style.cartTotalItem}>
                  <span className={style.cartTotalValueName}>Скидка:</span>
                  <span className={discount===0? style.cartTotalValue : style.cartTotalValueBonus}>{discount.toLocaleString()} ₽</span>
                </p>
                <p className={style.cartTotalItem}>
                  <span className={style.cartTotalValueName}>К оплате:</span>
                  <span className={style.cartTotalValuePayment}>{payment.toLocaleString()} ₽</span>
                </p>
                <button
                  className={style.orderButton}
                  onClick={(evt) => {
                    evt.preventDefault();
                    handleSubmitNewOrder({
                      guitarsIds: orderList.map((item) => (item.guitar.id)),
                      coupon: null,
                    });
                  }}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {selectGuitarId===null?
        null :
        (
          <DeleteItemPopup
            guitar={orderList.filter((item) => item.guitar.id=== selectGuitarId)[0].guitar}
            onGuitarId={(id) => setSelectGuitarId(id)}
            onDelete={(guitar) => {
              const updateOrderList=orderList.slice().filter((item) => item.guitar!==guitar);
              setSelectGuitarId(null);
              dispatch(changeOrderList(updateOrderList));
              dispatch(getOrderList());
            }}
          />
        )}
    </div>
  );
}

export default Cart;
