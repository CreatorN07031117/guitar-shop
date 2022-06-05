import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks/use-app-selector';
import style from './header.module.css';
import '../app/app.module.css';


function Header(): JSX.Element {
  const location = useLocation();
  const {orderList} = useAppSelector(({CART}) => CART);

  return (
    <header className={style.header} id="header">
      <div className={style.headerWrapper}>
        <Link to={AppRoute.Index} className={style.headerLogo}><img className={style.logoImg} width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className={style.mainNav}>
          <ul className={style.mainNavList}>
            <li>
              <Link className={location.pathname === AppRoute.Index? style.mainNavLinkCurrent : style.mainNavLink} to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li>
              <Link className={style.mainNavLink} to="#">Где купить?</Link>
            </li>
            <li>
              <Link className={style.mainNavLink} to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className={style.formSearch}>
          <form className={style.formSearchForm} id="form-search">
            <button className={style.formSearchSubmit} type="submit">
              <svg className={style.formSearchIcon} width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className={style.visuallyHidden}>Начать поиск</span>
            </button>
            <input className={style.formSearchInput} id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
            <label className={style.visuallyHidden} htmlFor="search">Поиск</label>
          </form>
          <ul className={style.formSearchSelectListHidden}>
            <li className={style.formSearchSelectItem} tabIndex={0}>Четстер Plus</li>
            <li className={style.formSearchSelectItem} tabIndex={0}>Четстер UX</li>
            <li className={style.formSearchSelectItem} tabIndex={0}>Четстер UX2</li>
            <li className={style.formSearchSelectItem} tabIndex={0}>Четстер UX3</li>
            <li className={style.formSearchSelectItem} tabIndex={0}>Четстер UX4</li>
            <li className={style.formSearchSelectItem} tabIndex={0}>Четстер UX5</li>
          </ul>
          <button className={style.formSearchReset} type="reset" form="form-search">
            <svg className={style.formSearchIcon} width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className={style.visuallyHidden}>Сбросить поиск</span>
          </button>
        </div>
        <Link className={style.headerCartLink} to="#" aria-label="Корзина">
          <svg className={style.headerCartIcon} width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className={style.visuallyHidden}>Перейти в корзину</span>
          {orderList.length>0 && <span className={style.headerCartCount}>{orderList.length}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
