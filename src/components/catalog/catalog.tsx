import {useState} from 'react';
import {Link, Navigate, useLocation} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import CatalogSort from './components/catalog-sort/catalog-sort';
import GuitarCard from './components/guitar-card/gutar-card';
import Pagination from './components/pagination/pagination';
import CartAddPopup from '../cart-add-popup/cart-add-popup';
import CartAddSuccess from '../cart-add-success/cart-add-success';
import {getPages, setPages} from '../../store/catalog-process/catalog-process';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {CARDS_PER_PAGE, AppRoute} from '../../const';
import style from './catalog.module.css';
import '../app/app.module.css';


function Catalog(): JSX.Element {
  const [selectGuitarId, setSelectGuitarId] = useState <null | number> (null);
  const [addToCart, setAddToCart] = useState <boolean> (false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const {guitars, currentPage, isDataLoaded} = useAppSelector(({CATALOG}) => CATALOG);

  const guitarsOnPage = guitars.slice(CARDS_PER_PAGE*(currentPage-1), CARDS_PER_PAGE*currentPage);

  if(isDataLoaded && guitarsOnPage.length === 0 && location.search === ''){
    return (<Navigate to={'/*'}></Navigate>);
  }

  dispatch(setPages(guitars.length/CARDS_PER_PAGE));
  dispatch(getPages());

  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.pageContent}>
        <div className={style.container}>
          <h1 className={style.pageTitle}>Каталог гитар</h1>
          <ul className={style.breadcrumbs}>
            <li className={style.breadcrumbsItem}>
              <Link to={AppRoute.Index} className={style.link}>Главная</Link>
            </li>
            <li className={style.breadcrumbsItem}>
              <span className={style.link}>Каталог</span>
            </li>
          </ul>
          <div className={style.catalog}>
            <CatalogFilter />
            <CatalogSort />
            <div className={style.catalogCards}>
              {
                isDataLoaded?
                  (guitarsOnPage.map((item) => <GuitarCard key={item.id} guitar={item} onGuitarId={(id) => setSelectGuitarId(id)} />)) :
                  (<p>Загружаем данные...</p>)
              }
              {guitarsOnPage.length === 0 && isDataLoaded && (<p>Таких товаров не найдено</p>)}
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
      {selectGuitarId===null?
        null :
        <CartAddPopup
          guitar={guitarsOnPage.filter((item) => item.id === selectGuitarId)[0]}
          onGuitarId={(id) => setSelectGuitarId(id)}
          onAddSuccess={(value: boolean) => setAddToCart(value)}
        />}
      {addToCart && <CartAddSuccess onAddSuccess={(value: boolean) => setAddToCart(value)} />}
    </div>
  );
}

export default Catalog;
