import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

function Header(): JSX.Element {

  const { orderList } = useAppSelector(({CART}) => CART);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link to={AppRoute.Index} className="header__logo logo"><img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className="link main-nav__link link--current" to="#">Каталог</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form" id="form-search">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
          </ul>
          <button className="form-search__reset" type="reset" form="form-search">
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__cart-link" to="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>
          {orderList.length>0 && <span className="header__cart-count">{orderList.length}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
