import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { COMMENTS_ON_PAGE } from '../../../../const';
import CommentItem from '../comment-item/comment-item';
import NewCommentPopup from '../new-comment-popup/new-comment-popup';
import SuccessCommentAddPopup from '../success-comment-add-popup/success-comment-add-popup';

function CommentsList (): JSX.Element {

  const { comments, guitar } = useAppSelector(({PRODUCT}) => PRODUCT);

  const [showComments, setShowComments] = useState ({
    list: comments.slice(0, COMMENTS_ON_PAGE),
    counter: COMMENTS_ON_PAGE,
  });
  const allComments = comments.length;
  const [newComment, setNewComment] = useState <boolean> (false);
  const [successAddComment, setSuccessAddComment] = useState <boolean> (false);

  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">Отзывы</h3>
        <span
          className="button button--red-border button--big reviews__sumbit-button"
          onClick={() => {
            setNewComment(true);
          }}
        >
          Оставить отзыв
        </span>
        {showComments.list.map((item) =>(
          <CommentItem key={item.id} comment={item} />
        ))}
        {showComments.counter < allComments && <button
          className="button button--medium reviews__more-button"
          onClick={(evt) => {
            evt.preventDefault();

            setShowComments({
              list: comments.slice(0, showComments.counter+ COMMENTS_ON_PAGE),
              counter: showComments.counter +  COMMENTS_ON_PAGE,
            });
          }}
        >
        Показать еще отзывы
        </button>}
        <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
      </section>
      {newComment && <NewCommentPopup
        id={guitar.id as number}
        onNewComment={(value:boolean) => setNewComment(value)}
        onSuccessComment={(value:boolean) => setSuccessAddComment(value)}
       />}
      {successAddComment && <SuccessCommentAddPopup onSuccessComment={(value:boolean) => setSuccessAddComment(value)}/>}
    </>
  );
}

export default CommentsList;
