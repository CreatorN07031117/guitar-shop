import {useCallback, useEffect} from 'react';
import FocusTrap from 'focus-trap-react';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {setOrderList, getOrderList} from '../../store/cart-process/cart-process';
import {GuitarType} from '../../const';
import {getRetinaImg} from '../../utils';
import {Guitar} from '../../types/data-types';
import style from './cart-add-popup.module.css';
import '../app/app.module.css';


type CartAddPopupProps = {
  guitar: Guitar;
  onGuitarId: (id: number | null) => void;
  onAddSuccess: (value: boolean) => void;
}

function CartAddPopup({guitar, onGuitarId, onAddSuccess}:CartAddPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
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

  const handleClick = (item: number) => {
    dispatch(setOrderList(item));
    dispatch(getOrderList());
  };

  const handleClickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onGuitarId(null);
    }
  },[onGuitarId]);

  useEffect(() => {
    document.addEventListener('keydown', handleClickOnEsc);
  }, [handleClickOnEsc]);

  const handleClickOnOverlay = useCallback((evt) => {
    if(evt.target.dataset.closeModal){
      onGuitarId(null);
    }
  },[onGuitarId]);

  useEffect(()=>{
    document.addEventListener('click', handleClickOnOverlay);
  }, [handleClickOnOverlay]);

  const handleBtnClick = (evt:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    onGuitarId(null);
    onAddSuccess(true);
    handleClick(guitar.id);
  };

  return (
    <FocusTrap
      focusTrapOptions={{
        fallbackFocus: '#add-to-cart',
      }}
    >
      <div>
        <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
          <div className={style.modal}>
            <div className={style.modalWrapper}>
              <div className={style.modalOverlay} data-close-modal></div>
              <div className={style.modalContent}>
                <h2 className={style.modalHeader}>Добавить товар в корзину</h2>
                <div className={style.modalInfo}>
                  <img className={style.modalImg} src={`../${guitar.previewImg}`} srcSet={`../${retinaImg}`} width="67" height="137" alt={guitar.name} />
                  <div className={style.modalInfoWrapper}>
                    <h3 className={style.modalTitle}>{guitar.name}</h3>
                    <p className={style.modalProductParams}>Артикул: {guitar.vendorCode}</p>
                    <p className={style.productParams}>{shortDescription(guitar.type, guitar.stringCount)}</p>
                    <p className={style.modalPriceWrapper}>
                      <span className={style.modalPrice}>Цена:</span><span className={style.modalPrice}>{guitar.price.toLocaleString()} ₽</span>
                    </p>
                  </div>
                </div>
                <div className={style.modalButtonContainer}>
                  <button
                    id='add-to-cart'
                    className={style.button}
                    onClick={(evt) => {
                      handleBtnClick(evt);
                    }}
                  >
                Добавить в корзину
                  </button>
                </div>
                <button
                  className={style.modalCloseBtn}
                  type="button"
                  aria-label="Закрыть"
                  onClick={() => {
                    onGuitarId(null);
                  }}
                >
                  <span className={style.buttonCrossIcon}></span>
                  <span className={style.modalCloseBtninteractiveArea}></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default CartAddPopup;
