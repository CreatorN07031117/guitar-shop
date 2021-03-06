import {useCallback, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {redirectToRoute} from '../../store/actions';
import {AppRoute} from '../../const';
import style from './cart-add-success.module.css';
import '../app/app.module.css';


type CartAddSuccessProps = {
  onAddSuccess: (value: boolean) => void;
}

function CartAddSuccess({onAddSuccess}:CartAddSuccessProps): JSX.Element {

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const handleClickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onAddSuccess(false);
    }
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
    <FocusTrap
      focusTrapOptions={{
        fallbackFocus: '#continue',
      }}
    >
      <div>
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
                  <button
                    className={style.goToCartBtn}
                    onClick={() => {
                      dispatch(redirectToRoute(AppRoute.Cart));
                    }}
                  >
                    Перейти в корзину
                  </button>
                  <button
                    id='continue'
                    className={style.continueShoppingBtn}
                    onClick={() => {
                      onAddSuccess(false);
                      if(location.pathname.includes('guitars')){
                        dispatch(redirectToRoute(AppRoute.Index));
                      }
                    }}
                  >
                    Продолжить покупки
                  </button>
                </div>
                <button
                  className={style.modalCloseBtn}
                  type="button"
                  aria-label="Закрыть"
                  onClick={() => {onAddSuccess(false);}}
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

export default CartAddSuccess;
