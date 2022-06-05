import {useCallback, useEffect} from 'react';
import style from './success-comment-add-popup.module.css';
import '../../../app/app.module.css';


type SuccessCommentAddPopupProps = {
  onSuccessComment: (value: boolean) => void,
};

function SuccessCommentAddPopup({onSuccessComment}: SuccessCommentAddPopupProps): JSX.Element {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const HandleClickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onSuccessComment(false);
    }
  },[onSuccessComment]);

  useEffect(() => {
    document.addEventListener('keydown', HandleClickOnEsc);
  }, [HandleClickOnEsc]);

  const HandleClickOnOverlay = useCallback((evt) => {
    if(evt.target.dataset.closeModal){
      onSuccessComment(false);
    }
  },[onSuccessComment]);

  useEffect(() => {
    document.addEventListener('click', HandleClickOnOverlay);
  }, [HandleClickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className={style.modal}>
        <div className={style.modalWrapper}>
          <div className={style.modalOverlay} data-close-modal></div>
          <div className={style.modalContent}>
            <svg className={style.modalIcon} width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className={style.modalMessage}>Спасибо за ваш отзыв!</p>
            <div className={style.modalButtonContainer}>
              <button
                className={style.modalButton}
                onClick={()=>{
                  onSuccessComment(false);
                }}
              >
                К покупкам!
              </button>
            </div>
            <button
              className={style.modalCloseBtn}
              type="button"
              aria-label="Закрыть"
              onClick={()=>{
                onSuccessComment(false);
              }}
            >
              <span className={style.buttonCrossIcon}>
              </span><span className={style.modalCloseBtninteractiveArea}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessCommentAddPopup;
