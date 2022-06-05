import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {Comment} from '../../../../types/data-types';
import {getRatingStars, spotRating} from '../../../../utils';
import style from './comment-item.module.css';
import '../../../app/app.module.css';


type CommentItemProps = {
  comment: Comment
}

function CommentItem ({comment}: CommentItemProps): JSX.Element {
  dayjs.locale('ru');
  const rating = getRatingStars(comment.rating);
  const date = dayjs(comment.createAt).format('D MMMM YYYY');

  return (
    <div className={style.review}>
      <div className={style.reviewWrapper}>
        <h4 className={style.reviewTitleName}>{comment.userName}</h4><span className={style.reviewDate}>{date}</span>
      </div>
      <div className={style.rate}>
        {rating.map((item, index) => (
          <svg key={item.concat(index.toString())} width="16" height="16" aria-hidden="true">
            <use xlinkHref={item}> </use>
          </svg> ))}
        <p className={style.visuallyHidden}>Оценка: {spotRating(comment.rating)}</p>
      </div>
      <h4 className={style.reviewTitle}>Достоинства:</h4>
      <p className={style.reviewValue}>{comment.advantage}</p>
      <h4 className={style.reviewTitle}>Недостатки:</h4>
      <p className={style.reviewValue}>{comment.disadvantage}</p>
      <h4 className={style.reviewTitle}>Комментарий:</h4>
      <p className={style.reviewValue}>{comment.comment}</p>
    </div>
  );
}

export default CommentItem;
