import {useCallback, useEffect} from 'react';
import FocusTrap from 'focus-trap-react';
import {GuitarType} from '../../../../const';
import {getRetinaImg} from '../../../../utils';
import {Guitar} from '../../../../types/data-types';
import style from './delete-item-popup.module.css';
import '../../../app/app.module.css';


type DeleteItemPopupProps = {
  guitar: Guitar;
  onGuitarId: (id: number | null) => void;
  onDelete: (guitar: Guitar) => void;
}

function DeleteItemPopup({guitar, onGuitarId, onDelete}: DeleteItemPopupProps): JSX.Element {
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const HandleClickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onGuitarId(null);
    }
  },[onGuitarId]);

  useEffect(() => {
    document.addEventListener('keydown', HandleClickOnEsc);
  }, [HandleClickOnEsc]);

  const HandleClickOnOverlay = useCallback((evt) => {
    if(evt.target.dataset.closeModal){
      onGuitarId(null);
    }
  },[onGuitarId]);

  useEffect(() => {
    document.addEventListener('click', HandleClickOnOverlay);
  }, [HandleClickOnOverlay]);

  return (
    <FocusTrap
      focusTrapOptions={{
        fallbackFocus: '#delete',
      }}
    >
      <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
        <div className={style.modal}>
          <div className={style.modalWrapper}>
            <div className={style.modalOverlay} data-close-modal></div>
            <div className={style.modalContent}>
              <h2 className={style.modalHeader}>Удалить этот товар?</h2>
              <div className={style.modalInfo}>
                <img className={style.modalImg} src={`../${guitar.previewImg}`} srcSet={`../${retinaImg}`} width="67" height="137" alt={guitar.name} />
                <div className={style.modalInfoWrapper}>
                  <h3 className={style.modalProductName}>{guitar.name}</h3>
                  <p className={style.modalProductParams}>Артикул: {guitar.vendorCode}</p>
                  <p className={style.productParams}>{shortDescription(guitar.type, guitar.stringCount)}</p>
                  <p className={style.modalPriceWrapper}>
                    <span className={style.modalPrice}>Цена:</span>
                    <span className={style.modalPrice}>{guitar.price.toLocaleString()} ₽</span>
                  </p>
                </div>
              </div>
              <div className={style.modalButtonContainer}>
                <button
                  className={style.modalButton}
                  id='delete'
                  onClick={() => {
                    onDelete(guitar);
                  }}
                >
                  Удалить товар
                </button>
                <button
                  className={style.modalButtonRight}
                  onClick={() => {
                    onGuitarId(null);
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
                  onGuitarId(null);
                }}
              >
                <span className={style.buttonCrossIcon}></span>
                <span className={style.interactiveArea}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default DeleteItemPopup;
