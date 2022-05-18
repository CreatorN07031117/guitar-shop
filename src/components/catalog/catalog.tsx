import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import CatalogSort from './components/catalog-sort/catalog-sort';
import GuitarCard from './components/guitar-card/gutar-card';
import Pagination from './components/pagination/pagination';
import CartAddPopup from './components/cart-add-popup/cart-add-popup';
import CartAddSuccess from './components/cart-add-success/cart-add-success';
import { getPages, setPages } from '../../store/catalog-process/catalog-process';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { CARDS_PER_PAGE, AppRoute  } from '../../const';
import { mockGuitars } from '../../mock/mock';


function Catalog(): JSX.Element {
  const [selectGuitarId, setSelectGuitarId] = useState <null | number> (null);
  const [addToCart, setAddToCart] = useState <boolean> (false);

  const dispatch = useAppDispatch();
  const { guitars, currentPage } = useAppSelector(({CATALOG}) => CATALOG);
  const guitarsOnPage = mockGuitars.slice(CARDS_PER_PAGE*(currentPage-1), CARDS_PER_PAGE*currentPage);

  dispatch(setPages(mockGuitars.length/CARDS_PER_PAGE));
  dispatch(getPages());


  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <span className="link">Главная</span>
            </li>
            <li className="breadcrumbs__item">
              <span className="link">Каталог</span>
            </li>
          </ul>
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <div className="cards catalog__cards">
              {
                guitarsOnPage.map((item) => <GuitarCard key={item.id} guitar={item} onGuitarId={(id) => setSelectGuitarId(id)}  />)
              }
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
      {selectGuitarId===null? null : <CartAddPopup guitar={guitarsOnPage.filter((item) => item.id === selectGuitarId)[0]} onGuitarId={(id) => setSelectGuitarId(id)} onAddSuccess={(value: boolean) => setAddToCart(value)} />}
      {addToCart && <CartAddSuccess onAddSuccess={(value: boolean) => setAddToCart(value)} />}
    </div>
  );
}

export default Catalog;
