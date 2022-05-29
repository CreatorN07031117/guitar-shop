import { useCallback, useEffect } from 'react';
import { getRetinaImg } from '../../utils';
import { useAppDispatch } from '../../hooks/hooks';
import { setOrderList, getOrderList } from '../../store/cart-process/cart-process';
import { GuitarType } from '../../const';
import { Guitar } from '../../types/data-types';


type CartAddPopupProps = {
  guitar: Guitar;
  onGuitarId: (id: number | null) => void;
  onAddSuccess: (value: boolean) => void;
}

function CartAddPopup ({guitar, onGuitarId, onAddSuccess}:CartAddPopupProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const retinaImg = getRetinaImg (guitar.previewImg);

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
      onGuitarId(null); }
  },[onGuitarId]);

  useEffect(() => {
    document.addEventListener('keydown', handleClickOnEsc);
  }, [handleClickOnEsc]);

  const handleClickOnOverlay = useCallback((evt) => {
    if(evt.target.className === 'modal__overlay'){
      onGuitarId(null);
    }
  },[onGuitarId]);

  useEffect(() => {
    document.addEventListener('click', handleClickOnOverlay);
  }, [handleClickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`../${guitar.previewImg}`} srcSet={`../${retinaImg}`} width="67" height="137" alt={guitar.name} />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{guitar.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
                <p className="modal__product-params">{shortDescription(guitar.type, guitar.stringCount)}</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span><span className="modal__price">{guitar.price.toLocaleString()} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                className="button button--red button--big modal__button modal__button--add"
                onClick={(evt) => {
                  evt.preventDefault();
                  onGuitarId(null);
                  onAddSuccess(true);
                  handleClick(guitar.id);
                }}
              >
                Добавить в корзину
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={() => {
                onGuitarId(null);
              }}
            >
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAddPopup;
