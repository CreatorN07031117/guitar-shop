import Header from '../header/header';
import Footer from '../footer/footer';
import style from './page-not-found.module.css';
import '../app/app.module.css';


function PageNotFound ():JSX.Element {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.pageContent}>
        <div className={style.container}>
          <h1 className={style.titleBigger}>404</h1>
          <p>Такой страницы не существует</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PageNotFound;
