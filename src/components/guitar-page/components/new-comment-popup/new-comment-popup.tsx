import {useState, ChangeEvent, useRef, useCallback, useEffect} from 'react';
import {useAppDispatch} from '../../../../hooks/use-app-dispatch';
import {AddCommentAction} from '../../../../store/api-actions';
import {NewComment, Comment} from '../../../../types/data-types';
import {generateUid} from '../../../../utils';
import style from './new-comment-popup.module.css';
import '../../../app/app.module.css';


type NewCommentPopupProps = {
  guitarName: string,
  id: number,
  onNewComment: (value:boolean) => void;
  onSuccessComment: (value: boolean) => void;
  onAddComment:(item: Comment) => void;
}

function NewCommentPopup ({id, onNewComment, onSuccessComment, guitarName, onAddComment}:NewCommentPopupProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [warning, setWarning] = useState({
    userName: false,
    rating: false,
    advantage: false,
    disadvantage: false,
    comment: false,
  });

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
    setWarning((prevWarning) => ({
      ...prevWarning,
      userName: false,
      rating: false,
      advantage: false,
      disadvantage: false,
      comment: false,
    }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setNewComment((prevNewComment) => ({...prevNewComment, [name]: value}));
    setWarning((prevWarning) => ({
      ...prevWarning,
      userName: false,
      rating: false,
      advantage: false,
      disadvantage: false,
      comment: false,
    }));
  };

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setNewComment((prevNewComment) => ({...prevNewComment, [name]: value}));
  };

  const handleSubmitComment = (newCommentItem: NewComment) => {
    if(newComment.userName.length === 0){
      setWarning((prevWarning) => ({...prevWarning, name: true}));
    }
    if(newComment.rating === 0){
      setWarning((prevWarning) => ({...prevWarning, rating: true}));
    }
    if(newComment.advantage.length === 0){
      setWarning((prevWarning) => ({...prevWarning, advantage: true}));
    }
    if(newComment.disadvantage.length === 0){
      setWarning((prevWarning) => ({...prevWarning, disadvantage: true}));
    }
    if(newComment.comment.length === 0){
      setWarning((prevWarning) => ({...prevWarning, comment: true}));
    }
    if(newComment.userName.length > 0 &&
       newComment.rating > 0 &&
       newComment.advantage.length > 0 &&
       newComment.disadvantage.length > 0 &&
       newComment.comment.length > 0){
      dispatch(AddCommentAction(newCommentItem));
      const comment = Object.assign({
        createAt: new Date(),
        id: generateUid(),
      }, newComment);
      onAddComment(comment);
      onNewComment(false);
      onSuccessComment(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset';};
  }, []);

  const HandleClickOnEsc = useCallback((evt) => {
    if(evt.keyCode === 27){
      onNewComment(false);}
  },[onNewComment]);

  useEffect(() => {
    document.addEventListener('keydown', HandleClickOnEsc);
  }, [HandleClickOnEsc]);

  const HandleClickOnOverlay = useCallback((evt) => {
    if(evt.target.dataset.closeModal){
      onNewComment(false);
    }
  },[onNewComment]);

  useEffect(() => {
    document.addEventListener('click', HandleClickOnOverlay);
  }, [HandleClickOnOverlay]);

  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}}>
      <div className={style.modal}>
        <div className={style.modalWrapper}>
          <div className={style.modalOverlay} data-close-modal></div>
          <div className={style.modalContent}>
            <h2 className={style.modalHeader}>Оставить отзыв</h2>
            <h3 className={style.modalTitle}>{guitarName}</h3>
            <form className={style.formReview}
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
              }}
            >
              <div className={style.formReviewWrapper}>
                <div className={style.formReviewNameWrapper}>
                  <label className={style.formReviewLabel} htmlFor="user-name">Ваше Имя</label>
                  <input
                    className={style.formReviewInput}
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    name="userName"
                    ref={inputNameRef}
                    value={newComment.userName}
                    onChange={handleInputChange}
                    data-testid="name"
                  />
                  {warning.userName? (<p className={style.formReviewWarning}>Заполните поле</p>) : (<div style={{height: '15px'}}></div>)}
                </div>
                <div>
                  <span className={style.formReviewLabel}>Ваша Оценка</span>
                  <div className={style.rate}>
                    <input className={style.visuallyHidden} id="star-5" name="rating" type="radio" value="5" onChange={handleRatingChange} />
                    <label className={style.rateLabel} htmlFor="star-5" title="Отлично"></label>
                    <input className={style.visuallyHidden} id="star-4" name="rating" type="radio" value="4" onChange={handleRatingChange} />
                    <label className={style.rateLabel} htmlFor="star-4" title="Хорошо"></label>
                    <input className={style.visuallyHidden} id="star-3" name="rating" type="radio" value="3" onChange={handleRatingChange} />
                    <label className={style.rateLabel} htmlFor="star-3" title="Нормально"></label>
                    <input className={style.visuallyHidden} id="star-2" name="rating" type="radio" value="2" onChange={handleRatingChange} />
                    <label className={style.rateLabel} htmlFor="star-2" title="Плохо"></label>
                    <input className={style.visuallyHidden} id="star-1" name="rating" type="radio" value="1" onChange={handleRatingChange} />
                    <label className={style.rateLabel} htmlFor="star-1" title="Ужасно"></label>
                    {warning.rating && (<p className={style.rateMessage}>Поставьте оценку</p>)}
                  </div>
                </div>
              </div>
              <label className={style.formReviewLabel} htmlFor="adv">Достоинства</label>
              <input
                className={style.formReviewInput}
                data-testid="adv"
                type="text"
                autoComplete="off"
                name="advantage"
                ref={inputAdvRef}
                value={newComment.advantage}
                onChange={handleInputChange}
              />
              {warning.advantage? (<p className={style.formReviewWarning}>Заполните поле</p>): (<div style={{height: '15px'}}></div>)}
              <label className={style.formReviewLabel} htmlFor="disadv">Недостатки</label>
              <input
                className={style.formReviewInput}
                data-testid="disadv"
                id="disadv"
                type="text"
                autoComplete="off"
                name="disadvantage"
                ref={inputDisadvRef}
                value={newComment.disadvantage}
                onChange={handleInputChange}
              />
              {warning.disadvantage? (<p className={style.formReviewWarning}>Заполните поле</p>): (<div style={{height: '15px'}}></div>)}
              <label className={style.formReviewLabel} htmlFor="comment">Комментарий</label>
              <textarea
                className={style.formReviewTextarea}
                id="comment"
                data-testid="comment"
                rows={10}
                autoComplete="off"
                name="comment"
                ref={textAreaRef}
                value={newComment.comment}
                onChange={handleTextAreaChange}
              >
              </textarea>
              {warning.comment? (<p className={style.formReviewWarning}>Заполните поле</p>) : (<div style={{height: '15px'}}></div>)}
              <button
                className={style.modalButton}
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
            <button
              className={style.modalCloseBtn}
              type="button"
              aria-label="Закрыть"
              onClick={() => onNewComment(false)}
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

export default NewCommentPopup;
