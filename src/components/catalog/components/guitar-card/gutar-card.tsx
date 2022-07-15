import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../../hooks/use-app-selector';
import {getRetinaImg, getRatingStars} from '../../../../utils';
import {Guitar} from '../../../../types/data-types';
import {spotRating} from '../../../../utils';
import style from './guitar-card.module.css';
import '../../../app/app.module.css';


type GuitarCardProps = {
  guitar: Guitar;
  onGuitarId: (id: number | null) => void;
}

function GuitarCard({guitar, onGuitarId}:GuitarCardProps): JSX.Element {

  const {orderList} = useAppSelector(({CART}) => CART);
  const retinaPreviewImg = getRetinaImg(guitar.previewImg);
  const inCart = orderList.find((item) => (item.guitar.id === guitar.id));

  const rating = getRatingStars(guitar.rating);

  return (
    <div className={style.productCard}>
      <img src={guitar.previewImg} srcSet={retinaPreviewImg} width="75" height="190" alt={guitar.name} />
      <div className={style.productCardInfo}>
        <div className={style.rate}>
          {rating.map((item, index) => (
            <svg key={item.concat(index.toString())} width="12" height="11" aria-hidden="true">
              <use xlinkHref={item}> </use>
            </svg>
          ))}
          <p className={style.visuallyHidden}>Рейтинг: {spotRating(guitar.rating)}</p>
          <p className={style.rateCount}>
            <span className={style.visuallyHidden}>Всего оценок:</span>{guitar.comments?.length}
          </p>
        </div>
        <p className={style.productCardTitle}>{guitar.name}</p>
        <p className={style.productCardPrice}>
          <span className={style.visuallyHidden}>Цена:</span>{guitar.price.toLocaleString()} ₽
        </p>
      </div>
      <div className={style.productCardButtons}>
        <Link to={`/guitars/${guitar.id}`} className={style.getMoreBtn}>Подробнее</Link>
        {inCart?
          <Link to={'/cart'} className={style.inCartYetBtn}>В Корзине</Link> :
          <span
            className={style.addInCartBtn}
            data-testid="addToCart"
            onClick={() => {
              onGuitarId(guitar.id);
            }}
          >Купить
          </span>}
      </div>
    </div>
  );
}

export default GuitarCard;
