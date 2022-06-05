import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import style from './footer.module.css';
import '../app/app.module.css';


function Footer(): JSX.Element {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <Link to={AppRoute.Index} className={style.footerLogo}>
          <img className={style.logoImg} width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <div className={style.footerSocials}>
          <ul className={style.socialsList}>
            <li className={style.socialsItem}>
              <a className={style.socialsLink} href={'https://www.skype.com/'} aria-label="skype">
                <svg className={style.socialsIcon} width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-skype"></use>
                </svg>
              </a>
            </li>
            <li className={style.socialsItem}>
              <a className={style.socialsLink} href="https://www.vsco.com/" aria-label="vsco">
                <svg className={style.socialsIcon} width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-vsco"></use>
                </svg>
              </a>
            </li>
            <li className={style.socialsItem}>
              <a className={style.socialsLink} href="https://www.pinterest.com/" aria-label="pinterest">
                <svg className={style.socialsIcon} width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <section className={style.footerNavSectionInfo}>
          <h2 className={style.footerNavTitle}>О нас</h2>
          <p className={style.footerNavContentFontSecondary}>Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!</p>
        </section>
        <section className={style.footerNavSectionLinks}>
          <h2 className={style.footerNavTitle}>Информация</h2>
          <ul className={style.footerNavList}>
            <li className={style.footerNavListItem}>
              <Link className={style.link} to="#">Где купить?</Link>
            </li>
            <li className={style.footerNavListItem}>
              <Link className={style.link} to="#">Блог</Link>
            </li>
            <li className={style.footerNavListItem}>
              <Link className={style.link} to="#">Вопрос - ответ</Link>
            </li>
            <li className={style.footerNavListItem}>
              <Link className={style.link} to="#">Возврат</Link>
            </li>
            <li className={style.footerNavListItem}>
              <Link className={style.link} to="#">Сервис-центры</Link>
            </li>
          </ul>
        </section>
        <section className={style.footerNavSectionContacts}>
          <h2 className={style.footerNavTitle}>Контакты</h2>
          <p className={style.footerNavContent}>г. Санкт-Петербург,<br/> м. Невский проспект, <br/>ул. Казанская 6.</p>
          <div className={style.footerNavContent}>
            <svg className={style.footerIcon} width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-phone"></use>
            </svg><a className={style.link} href="tel:88125005050"> 8-812-500-50-50</a>
          </div>
          <p className={style.footerNavContent}>Режим работы:<br/>
            <span className={style.footerSpan}>
              <svg className={style.footerIcon} width="13" height="13" aria-hidden="true">
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
