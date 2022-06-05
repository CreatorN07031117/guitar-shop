import {useCallback, useEffect} from 'react';
import style from './cart-add-success.module.css';
import '../app/app.module.css';


type CartAddSuccessProps = {
  onAddSuccess: (value: boolean) => void;
}

function CartAddSuccess ({onAddSuccess}:CartAddSuccessProps): JSX.Element {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const handleClickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onAddSuccess(false); }
  },[onAddSuccess]);

  useEffect(() => {
    document.addEventListener('keydown', handleClickOnEsc);
  }, [handleClickOnEsc]);

  const handleClickOnOverlay = useCallback((evt) => {
    if(evt.target.dataset.closeModal){
      onAddSuccess(false);
    }
  },[onAddSuccess]);

  useEffect(() => {
    document.addEventListener('click', handleClickOnOverlay);
  }, [handleClickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className={style.modal}>
        <div className={style.modalWrapper}>
          <div className={style.modalOverlay} data-close-modal></div>
          <div className={style.modalContent}>
            <svg className={style.modalIcon} width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className={style.modalMessage}>Товар успешно добавлен в корзину</p>
            <div className={style.modalButtonContainer}>
              <button className={style.goToCartBtn}>Перейти в корзину</button>
              <button
                className={style.continueShoppingBtn}
                onClick={() => {
                  onAddSuccess(false);
                }}
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className={style.modalCloseBtn}
              type="button"
              aria-label="Закрыть"
              onClick={() => {
                onAddSuccess(false);
              }}
            >
              <span className={style.buttonCrossIcon}></span>
              <span className={style.modalCloseBtninteractiveArea}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAddSuccess;
