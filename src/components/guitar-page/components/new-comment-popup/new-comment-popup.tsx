import { useState, ChangeEvent, useRef, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../../hooks/hooks';
import { AddCommentAction } from '../../../../store/api-actions';
import { NewComment } from '../../../../types/data-types';

type NewCommentPopupProps = {
  id: number,
  onNewComment: (value:boolean) => void;
  onSuccessComment: (value: boolean) => void;
}

function NewCommentPopup ({id, onNewComment, onSuccessComment}:NewCommentPopupProps): JSX.Element {
  const dispatch = useAppDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const inputAdvRef = useRef<HTMLInputElement | null>(null);
  const inputDisadvRef = useRef<HTMLInputElement | null>(null);

  const [newComment, setNewComment] = useState({
    guitarId: id,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setNewComment((prevNewComment) => ({...prevNewComment, [name]: Number(value)}));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setNewComment((prevNewComment) => ({...prevNewComment, [name]: value}));
  };
  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setNewComment((prevNewComment) => ({...prevNewComment, [name]: value}));
  };

  const handleSubmitComment = (newCommentItem: NewComment) => {
    dispatch(AddCommentAction(newCommentItem));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const clickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onNewComment(false); }
  },[]);

  useEffect(() => {
    document.addEventListener('keydown', clickOnEsc);
  }, [clickOnEsc]);

  const clickOnOverlay = useCallback((evt) => {
    if(evt.target.className === 'modal__overlay'){
      onNewComment(false);
    }
  },[]);

  useEffect(() => {
    document.addEventListener('click', clickOnOverlay);
  }, [clickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">СURT Z30 Plus</h3>
            <form className="form-review"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmitComment({
                  guitarId: newComment.guitarId,
                  userName: newComment.userName,
                  advantage: newComment.advantage,
                  disadvantage: newComment.disadvantage,
                  comment: newComment.comment,
                  rating: newComment.rating,
                });
                onSuccessComment(true);
              }}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input
                    className="form-review__input form-review__input--name"
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    name="userName"
                    ref={inputNameRef}
                    value={newComment.userName}
                    onChange={handleInputChange}
                  />
                  <p className="form-review__warning">Заполните поле</p>
                </div>
                <div>
                  <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input className="visually-hidden" id="star-5" name="rating" type="radio" value="5" onChange={handleRatingChange} />
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input className="visually-hidden" id="star-4" name="rating" type="radio" value="4" onChange={handleRatingChange} />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input className="visually-hidden" id="star-3" name="rating" type="radio" value="3" onChange={handleRatingChange} />
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input className="visually-hidden" id="star-2" name="rating" type="radio" value="2" onChange={handleRatingChange} />
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input className="visually-hidden" id="star-1" name="rating" type="radio" value="1" onChange={handleRatingChange} />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    <p className="rate__message">Поставьте оценку</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input
                className="form-review__input"

                type="text"
                autoComplete="off"
                name="advantage"
                ref={inputAdvRef}
                value={newComment.advantage}
                onChange={handleInputChange}
              />
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input
                className="form-review__input"
                id="disadv"
                type="text"
                autoComplete="off"
                name="disadvantage"
                ref={inputDisadvRef}
                value={newComment.disadvantage}
                onChange={handleInputChange}
              />
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea
                className="form-review__input form-review__input--textarea"
                id="comment"
                rows={10}
                autoComplete="off"
                name="comment"
                ref={textAreaRef}
                value={newComment.comment}
                onChange={handleTextAreaChange}
              >
              </textarea>
              <p className="form-review__warning">Заполните поле</p>
              <button
                className="button button--medium-20 form-review__button"
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={() => {
                onNewComment(false);
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

export default NewCommentPopup;