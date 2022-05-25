import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';


function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Link to={AppRoute.Index} className="footer__logo logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <div className="socials footer__socials">
          <ul className="socials__list">
            <li className="socials-item">
              <Link className="socials__link" to="https://www.skype.com/" aria-label="skype">
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-skype"></use>
                </svg>
              </Link>
            </li>
            <li className="socials-item">
              <Link className="socials__link" to="https://www.vsco.com/" aria-label="vsco">
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-vsco"></use>
                </svg>
              </Link>
            </li>
            <li className="socials-item">
              <Link className="socials__link" to="https://www.pinterest.com/" aria-label="pinterest">
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <section className="footer__nav-section footer__nav-section--info">
          <h2 className="footer__nav-title">О нас</h2>
          <p className="footer__nav-content footer__nav-content--font-secondary">Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!</p>
        </section>
        <section className="footer__nav-section footer__nav-section--links">
          <h2 className="footer__nav-title">Информация</h2>
          <ul className="footer__nav-list">
            <li className="footer__nav-list-item">
              <Link className="link" to="#">Где купить?</Link>
            </li>
            <li className="footer__nav-list-item">
              <Link className="link" to="#">Блог</Link>
            </li>
            <li className="footer__nav-list-item">
              <Link className="link" to="#">Вопрос - ответ</Link>
            </li>
            <li className="footer__nav-list-item">
              <Link className="link" to="#">Возврат</Link>
            </li>
            <li className="footer__nav-list-item">
              <Link className="link" to="#">Сервис-центры</Link>
            </li>
          </ul>
        </section>
        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">Контакты</h2>
          <p className="footer__nav-content">г. Санкт-Петербург,<br/> м. Невский проспект, <br/>ул. Казанская 6.</p>
          <div className="footer__nav-content">
            <svg className="footer__icon" width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-phone"></use>
            </svg><a className="link" href="tel:88125005050"> 8-812-500-50-50</a>
          </div>
          <p className="footer__nav-content">Режим работы:<br/>
            <span className="footer__span">
              <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                <use xlinkHref="#icon-clock"></use>
              </svg><span> с 11:00 до 20:00</span><span>без выходных</span>
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
