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
  const [promo, setPromo] = useState ({
    text: '',
  });

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
    setPromo((prevPromo) => ({...prevPromo, text: ''}));
  };

  const handleSubmitCoupon = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(promo.text === ''){
      return;
    }
    dispatch(postCoupon({coupon: promo.text as string}));
  };


  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.pageContent}>
        <div className={style.container}>
          <h1 className={style.pageTitle}>??????????????</h1>
          <ul className={style.breadcrumbsOnCart}>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Index}>??????????????</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Catalog}>??????????????</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <span className={style.link}>??????????????</span>
            </li>
          </ul>
          <div className={style.cart}>
            {orderList.length === 0?
              (<p>???? ???? ???????????????? ???????????? ?? ??????????????</p>) :
              (orderList.map((item, id) => (
                <CartItem
                  key={item.guitar.name}
                  guitar={item.guitar}
                  count={String(item.count)}
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
                <h2 className={style.couponTitle}>???????????????? ???? ????????????</h2>
                <p className={style.couponInfo}>?????????????? ???????? ????????????????, ???????? ???? ?? ?????? ????????.</p>
                <form
                  className={style.couponForm}
                  id="coupon-form"
                  method="post"
                  ref={couponRef}
                  onSubmit={(evt) => {handleSubmitCoupon(evt);}}
                >
                  <div className={style.couponInput}>
                    <label className={style.visuallyHidden}>????????????????</label>
                    <input
                      type="text"
                      placeholder="?????????????? ????????????????"
                      id="coupon"
                      name="coupon"
                      value={promo.text}
                      onChange={(evt) => {
                        const {value} = evt.target;
                        if(value[0] === ' ' && value[value.length - 1] === ' '){
                          setPromo((prevPromo) => ({...prevPromo, text: value.slice(1, value.length - 1)}));
                        } else if(value[0] === ' '){
                          setPromo((prevPromo) => ({...prevPromo, text: value.slice(1)}));
                        } else if(value[value.length - 1] === ' '){
                          setPromo((prevPromo) => ({...prevPromo, text: value.slice(0, value.length - 1)}));
                        } else {
                          setPromo((prevPromo) => ({...prevPromo, text: value}));
                        }
                      }}
                    />
                    {coupon.isValid !== null?
                      (
                        <p className={coupon.isValid? style.formMessageSuccess : style.formMessageError}>
                          {coupon.isValid? '???????????????? ????????????' : '???????????????? ????????????????'}
                        </p>
                      ): null}
                  </div>
                  <button
                    className={style.buttonPromo}
                    type="submit"
                  >
                    ??????????????????
                  </button>
                </form>
              </div>
              <div className={style.cartTotalInfo}>
                <p className={style.cartTotalItem}>
                  <span className={style.cartTotalValueName}>??????????:</span>
                  <span className={style.cartTotalValue}>{totalAmmount.toLocaleString()} ???</span>
                </p>
                <p className={style.cartTotalItem}>
                  <span className={style.cartTotalValueName}>????????????:</span>
                  <span className={discount===0? style.cartTotalValue : style.cartTotalValueBonus}>{discount.toLocaleString()} ???</span>
                </p>
                <p className={style.cartTotalItem}>
                  <span className={style.cartTotalValueName}>?? ????????????:</span>
                  <span className={style.cartTotalValuePayment}>{payment.toLocaleString()} ???</span>
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
                  ???????????????? ??????????
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
