import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { store } from '../../store/store';
import Header from '../header/header';
import Footer from '../footer/footer';
import CommentsList from './components/comments/comments';
import TabCharacteristics from './components/tab-characteristics/tab-characteristics';
import TabDescription from './components/tab-description/tab-description';
import CartAddPopup from '../cart-add-popup/cart-add-popup';
import CartAddSuccess from '../cart-add-success/cart-add-success';
import { fetchGuitarActions, fetchCommentsActions } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/hooks';
import { getRatingStars, getRetinaImg } from '../../utils';
import { AppRoute, GuitarType } from '../../const';


function GuitarPage (): JSX.Element {
  const params = useParams();

  const [selectGuitarId, setSelectGuitarId] = useState <null | number> (null);
  const [addToCart, setAddToCart] = useState <boolean> (false);
  const [activeTab, setActiveTab] = useState ('characteristics');

  useEffect(() => {
    store.dispatch(fetchGuitarActions(params.id as string));
  }, [params.id]);
  useEffect(() => {
    store.dispatch(fetchCommentsActions(params.id as string));
  });

  const { guitar } = useAppSelector(({PRODUCT}) => PRODUCT);
  const rating = getRatingStars(guitar.rating);

  let retinaImg;
  if(guitar.previewImg){
    retinaImg = getRetinaImg(guitar.previewImg);
  }

  const getGuitarType = (type:string) => {
    if(type === 'electric'){
      return GuitarType.Electric;
    } else if (type === 'ukulele'){
      return GuitarType.Ukulele;
    } else if (type === 'acoustic'){
      return GuitarType.Acoustic;
    } else {
      return type;
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitar.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Index}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <span className="link">{guitar.name}</span>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`../${guitar.previewImg}`} srcSet={`../${retinaImg}`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
              <div className="rate product-container__rating">
                {rating.map((item, index) => (
                  <svg key={item.concat(index.toString())} width="14" height="14" aria-hidden="true">
                    <use xlinkHref={item}> </use>
                  </svg> ))}
                <p className="visually-hidden">Оценка: {}</p>
              </div>
              <div className="tabs">
                <span className={`button button--medium tabs__button ${activeTab==='description' && 'button--black-border'}`}
                  onClick={() => {
                    setActiveTab((prevActiveTab) => (prevActiveTab = 'characteristics'));
                  }}
                >
                    Характеристики
                </span>
                <span className={`button button--medium tabs__button ${activeTab==='characteristics' && 'button--black-border'}`}
                  onClick={() => {
                    setActiveTab((prevActiveTab) => (prevActiveTab = 'description'));
                  }}
                >
                  Описание
                </span>
                <div className="tabs__content" id="characteristics">
                  {activeTab==='characteristics'?
                    <TabCharacteristics vendorCode={guitar.vendorCode} type={getGuitarType(guitar.type)} stringCount={guitar.stringCount} /> :
                    <TabDescription description={guitar.description} />}
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{guitar.price?.toLocaleString()} ₽</p>
              <span
                className="button button--red button--big product-container__button"
                onClick={() => {
                  setSelectGuitarId(guitar.id);
                }}
              >
                Добавить в корзину
              </span>
            </div>
          </div>
          <CommentsList />
        </div>
      </main>
      <Footer />
      {selectGuitarId===null? null : <CartAddPopup guitar={guitar} onGuitarId={(id) => setSelectGuitarId(id)} onAddSuccess={(value: boolean) => setAddToCart(value)} />}
      {addToCart && <CartAddSuccess onAddSuccess={(value: boolean) => setAddToCart(value)} />}
    </div>
  );
}

export default GuitarPage;
