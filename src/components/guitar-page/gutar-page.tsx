import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {store} from '../../store/store';
import Header from '../header/header';
import Footer from '../footer/footer';
import CommentsList from './components/comments/comments';
import TabCharacteristics from './components/tab-characteristics/tab-characteristics';
import TabDescription from './components/tab-description/tab-description';
import CartAddPopup from '../cart-add-popup/cart-add-popup';
import CartAddSuccess from '../cart-add-success/cart-add-success';
import {deleteComments} from '../../store/product-process/product-process';
import {fetchGuitarActions, fetchCommentsActions} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {getRatingStars, getRetinaImg} from '../../utils';
import {AppRoute, GuitarType} from '../../const';
import style from './guitar-page.module.css';
import '../app/app.module.css';


function GuitarPage (): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(deleteComments());
    store.dispatch(fetchCommentsActions(params.id as string));
    store.dispatch(fetchGuitarActions(params.id as string));
  }, [dispatch, params.id]);

  const [selectGuitarId, setSelectGuitarId] = useState <null | number> (null);
  const [addToCart, setAddToCart] = useState <boolean> (false);
  const [activeTab, setActiveTab] = useState ('characteristics');

  const {guitar, comments, isDataLoaded} = useAppSelector(({PRODUCT}) => PRODUCT);
  const rating = getRatingStars(guitar.rating);

  let retinaImg;
  if(guitar.previewImg){
    retinaImg = getRetinaImg(guitar.previewImg);
  }

  const getGuitarType = (type:string) => {
    if(type === 'electric'){
      return GuitarType.Electric;
    } else if(type === 'ukulele'){
      return GuitarType.Ukulele;
    } else if(type === 'acoustic'){
      return GuitarType.Acoustic;
    } else{
      return type;
    }
  };

  return (

    <div className={style.wrapper}>
      <Header />
      <main className={style.pageContent}>
        <div className={style.container}>
          <h1 className={style.titleBigger}>{guitar.name}</h1>
          <ul className={style.breadcrumbs}>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Index}>Главная</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <span className="link">{guitar.name}</span>
            </li>
          </ul>
          <div className={style.productContainer}>
            <img className={style.productContainerImg} src={`../${guitar.previewImg}`} srcSet={`../${retinaImg}`} width="90" height="235" alt={guitar.name} />
            <div className={style.productContainerInfoWapper}>
              <h2 className={style.productContainerTitle}>{guitar.name}</h2>
              <div className={style.rate}>
                {rating.map((item, index) => (
                  <svg key={item.concat(index.toString())} width="14" height="14" aria-hidden="true">
                    <use xlinkHref={item}> </use>
                  </svg>
                ))}
                <p className={style.visuallyHidden}>Оценка: {}</p>
                <p className={style.rateCount}><span className="visually-hidden">Всего оценок:</span>{comments?.length}</p>
              </div>
              <div className={style.tabs}>
                <span className={activeTab === 'description'? style.tabsButtonBlackBorder : style.tabsButton }
                  onClick={() => {
                    setActiveTab((prevActiveTab) => (prevActiveTab='characteristics'));
                  }}
                >
                    Характеристики
                </span>
                <span className={activeTab === 'characteristics'? style.tabsButtonBlackBorder : style.tabsButton}
                  onClick={() => {
                    setActiveTab((prevActiveTab) => (prevActiveTab='description'));
                  }}
                >
                  Описание
                </span>
                <div className={style.tabsContent} id="characteristics">
                  {activeTab==='characteristics'?
                    <TabCharacteristics vendorCode={guitar.vendorCode} type={getGuitarType(guitar.type)} stringCount={guitar.stringCount} /> :
                    <TabDescription description={guitar.description} />}
                </div>
              </div>
            </div>
            <div className={style.productContainerPriceWrapper}>
              <p className={style.priceInfoTitle}>Цена:</p>
              <p className={style.priceInfoValue}>{guitar.price?.toLocaleString()} ₽</p>
              <span
                className={style.addToCartButton}
                onClick={() => {
                  setSelectGuitarId(guitar.id);
                }}
              >
                Добавить в корзину
              </span>
            </div>
          </div>
          {isDataLoaded? <CommentsList /> : (<p>Комментарии загружаются...</p>)}
        </div>
      </main>
      <Footer />
      {selectGuitarId===null?
        null :
        <CartAddPopup
          guitar={guitar}
          onGuitarId={(id) => setSelectGuitarId(id)}
          onAddSuccess={(value: boolean) => setAddToCart(value)}
        />}
      {addToCart && <CartAddSuccess onAddSuccess={(value: boolean) => setAddToCart(value)}/>}
    </div>
  );
}

export default GuitarPage;
