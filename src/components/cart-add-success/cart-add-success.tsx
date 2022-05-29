import {useCallback, useEffect} from 'react';

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
    if(evt.target.className === 'modal__overlay'){
      onAddSuccess(false);
    }
  },[onAddSuccess]);

  useEffect(() => {
    document.addEventListener('click', handleClickOnOverlay);
  }, [handleClickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button className="button button--small modal__button">Перейти в корзину</button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={() => {
                  onAddSuccess(false);
                }}
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={() => {
                onAddSuccess(false);
              }}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAddSuccess;
