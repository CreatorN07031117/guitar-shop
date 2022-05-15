import { Link } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import CatalogSort from './components/catalog-sort/catalog-sort';
import GuitarCard from './components/guitar-card/gutar-card';
import Pagination from './components/pagination/pagination';
import { useAppSelector } from '../../hooks/hooks';
import { CARDS_PER_PAGE, AppRoute  } from '../../const';
import { mockGuitars } from '../../mock/mock';


function Catalog(): JSX.Element {

  const { guitars, currentPage } = useAppSelector(({CATALOG}) => CATALOG);

  const guitarsOnPage = mockGuitars.slice(CARDS_PER_PAGE*(currentPage-1), CARDS_PER_PAGE*currentPage);

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
                guitarsOnPage.map((item) => <GuitarCard key={item.id} guitar={item} />)
              }
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
