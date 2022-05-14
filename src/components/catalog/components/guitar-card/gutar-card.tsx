import { Link } from 'react-router-dom';
import { Guitar } from '../../../../types/data-types';
import { RATING_STARS } from '../../../../const';

type GuitarCardProps = {
  guitar: Guitar;
  cartList: number[];
}

function GuitarCard ({guitar, cartList}:GuitarCardProps): JSX.Element {

  const retinaPreviewImg = guitar.previewImg.slice(0, -4).concat('@2x.jpg 2x');

  const inCart = cartList.includes(guitar.id);

  const rating = [];

  for(let i = 0; i < RATING_STARS; i=i+1){
    if(i < guitar.rating){
      rating.push('#icon-full-star');} else {
      rating.push('#icon-star');}
  }

  return (
    <div className="product-card">
      <img src={guitar.previewImg} srcSet={retinaPreviewImg} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {rating.map((item) => (
            <svg key="item" width="12" height="11" aria-hidden="true">
              <use xlinkHref={item}> </use>
            </svg> ))}
          <p className="visually-hidden">Рейтинг: {}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.stringCount}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={`/guitars/${guitar.id}`} className="button button--mini">Подробнее</Link>
        {inCart?
          <span className="button button--red-border button--mini button--in-cart" >В Корзине</span> :
          <span className="button button--red button--mini button--add-to-cart">Купить</span>}
      </div>
    </div>
  );
}

export default GuitarCard;
