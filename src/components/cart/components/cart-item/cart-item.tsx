import {useState, FocusEvent} from 'react';
import {ChangeEvent} from 'react';
import {Guitar} from '../../../../types/data-types';
import {getRetinaImg} from '../../../../utils';
import {GuitarType, MIN_COUNT, MAX_COUNT} from '../../../../const';
import style from './cart-item.module.css';
import '../../../app/app.module.css';


type CartItemProps = {
  guitar: Guitar;
  count: number;
  isChangeQuantity: (count: number) => void;
  isDeleteItem: (id: number) => void;
}

function CartItem({guitar, count, isChangeQuantity, isDeleteItem}: CartItemProps): JSX.Element {

  const [quantity, setCount] = useState({
    count: count,
  });

  const retinaImg = getRetinaImg(guitar.previewImg);

  const shortDescription = (type:string, stringsCount:number) => {
    if(type === 'electric'){
      return `${GuitarType.Electric}. ${stringsCount} струнная`;
    } else if (type === 'ukulele'){
      return `${GuitarType.Ukulele}. ${stringsCount} струнная`;
    } else if (type === 'acoustic'){
      return `${GuitarType.Acoustic}. ${stringsCount} струнная`;
    } else {
      return `${type}. ${stringsCount} струнная`;
    }
  };

  const ammount = quantity.count * guitar.price;

  const decreaseQuantity = () => {
    if(quantity.count - 1 === 0){
      return isDeleteItem(guitar.id);
    }
    setCount((prevQuantity) => ({...prevQuantity, count: (quantity.count - 1)}));
    isChangeQuantity((quantity.count - 1));
  };

  const increaseQuantity = () => {
    setCount((prevQuantity) => ({...prevQuantity, count: (quantity.count + 1)}));
    isChangeQuantity((quantity.count + 1));
  };

  const changeQuantityHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;

    let newCount = value;
    if(Number(value) > 99){
      newCount = '99';
    }

    if(Number(value) < 0){
      newCount = value.slice(1);
    }

    setCount((prevQuantity) => ({...prevQuantity, count: Number(newCount)}));
    isChangeQuantity((Number(newCount)));
  };

  const blurQuantityHandle = (evt: FocusEvent<HTMLInputElement>) => {
    const {value} = evt.target;

    setCount((prevQuantity) => ({...prevQuantity, count: Number(value)}));
    isChangeQuantity((Number(value)));

    if(Number(value)===0){
      setCount((prevQuantity) => ({...prevQuantity, count: MIN_COUNT}));
      isChangeQuantity(MIN_COUNT);
      isDeleteItem(guitar.id);
    }

    if(Number(value) !== 0 && value[0] === '0'){
      const newCount = Number(value.slice(1));
      setCount((prevQuantity) => ({...prevQuantity, count: newCount}));
      isChangeQuantity((newCount));
    }
  };

  return (
    <div className={style.cartItem}>
      <button
        className={style.cartItemCloseButton}
        type="button"
        aria-label="Удалить"
        onClick={() => isDeleteItem(guitar.id)}
      >
        <span className={style.buttonCrossIcon}></span>
        <span className={style.interactiveArea}></span>
      </button>
      <div className={style.cartItemImage}>
        <img src={guitar.previewImg} srcSet={retinaImg} width="55" height="130" alt={guitar.name} />
      </div>
      <div className={style.cartItemInfo}>
        <p className={style.productInfoTitle}>{guitar.name}</p>
        <p className={style.productInfoInfo}>Артикул: {guitar.vendorCode}</p>
        <p className={style.productInfoInfo}>{shortDescription(guitar.type, guitar.stringCount)}</p>
      </div>
      <div className={style.cartItemPrice}>{guitar.price.toLocaleString()} ₽</div>
      <div className={style.quantity}>
        <button
          className={style.quantityButton}
          aria-label="Уменьшить количество"
          onClick={decreaseQuantity}
          disabled={quantity.count===0}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className={style.quantityInput}
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          max="99"
          value={quantity.count}
          onChange={(evt) => changeQuantityHandle(evt)}
          onBlur={(evt) => blurQuantityHandle(evt)}
        />
        <button
          className={style.quantityButton}
          aria-label="Увеличить количество"
          onClick={increaseQuantity}
          disabled={quantity.count===MAX_COUNT}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className={style.itemPriceTotal}>{ammount.toLocaleString()} ₽</div>
    </div>
  );
}

export default CartItem;
