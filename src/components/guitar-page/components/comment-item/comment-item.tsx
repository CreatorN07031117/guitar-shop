import { Comment } from '../../../../types/data-types';
import { getRatingStars } from '../../../../utils';

type CommentItemProps = {
  comment: Comment
}

function CommentItem ( {comment}: CommentItemProps): JSX.Element {

  const rating = getRatingStars(comment.rating);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4><span className="review__date">{comment.createAt}</span>
      </div>
      <div className="rate review__rating-panel">
        {rating.map((item, index) => (
          <svg key={item.concat(index.toString())} width="16" height="16" aria-hidden="true">
            <use xlinkHref={item}> </use>
          </svg> ))}
        <p className="visually-hidden">Оценка: {}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default CommentItem;
