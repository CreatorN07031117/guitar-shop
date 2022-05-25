import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../../hooks/hooks';
import {getRetinaImg, getRatingStars} from '../../../../utils';
import {Guitar} from '../../../../types/data-types';


type GuitarCardProps = {
  guitar: Guitar;
  onGuitarId: (id: number | null) => void;
}

function GuitarCard ({guitar, onGuitarId}:GuitarCardProps): JSX.Element {

  const {orderList} = useAppSelector(({CART}) => CART);

  const retinaPreviewImg = getRetinaImg(guitar.previewImg);
  const inCart = orderList.includes(guitar.id);

  const rating = getRatingStars(guitar.rating);

  return (
    <div className="product-card">
      <img src={guitar.previewImg} srcSet={retinaPreviewImg} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {rating.map((item, index) => (
            <svg key={item.concat(index.toString())} width="12" height="11" aria-hidden="true">
              <use xlinkHref={item}> </use>
            </svg> ))}
          <p className="visually-hidden">Рейтинг: {}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments?.length}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={`/guitars/${guitar.id}`} className="button button--mini">Подробнее</Link>
        {inCart?
          <span className="button button--red-border button--mini button--in-cart" >В Корзине</span> :
          <span
            className="button button--red button--mini button--add-to-cart"
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
