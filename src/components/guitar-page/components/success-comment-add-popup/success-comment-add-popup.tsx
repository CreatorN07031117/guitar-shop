import {useCallback, useEffect} from 'react';


type SuccessCommentAddPopupProps = {
  onSuccessComment: (value: boolean) => void,
};

function SuccessCommentAddPopup ({onSuccessComment}: SuccessCommentAddPopupProps): JSX.Element {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const clickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onSuccessComment(false);
    }
  },[onSuccessComment]);

  useEffect(() => {
    document.addEventListener('keydown', clickOnEsc);
  }, [clickOnEsc]);

  const clickOnOverlay = useCallback((evt) => {
    if(evt.target.className === 'modal__overlay'){
      onSuccessComment(false);
    }
  },[onSuccessComment]);

  useEffect(() => {
    document.addEventListener('click', clickOnOverlay);
  }, [clickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={()=>{
                  onSuccessComment(false);
                }}
              >
                К покупкам!
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={()=>{
                onSuccessComment(false);
              }}
            >
              <span className="button-cross__icon">
              </span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessCommentAddPopup;
