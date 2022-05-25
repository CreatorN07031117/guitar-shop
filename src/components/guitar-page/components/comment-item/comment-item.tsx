import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {Comment} from '../../../../types/data-types';
import {getRatingStars} from '../../../../utils';

type CommentItemProps = {
  comment: Comment
}

function CommentItem ( {comment}: CommentItemProps): JSX.Element {
  dayjs.locale('ru');
  const rating = getRatingStars(comment.rating);
  const date = dayjs(comment.createAt).format('D MMMM YYYY');

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4><span className="review__date">{date}</span>
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
