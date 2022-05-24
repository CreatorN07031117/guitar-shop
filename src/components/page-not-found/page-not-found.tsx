import Header from '../header/header';
import Footer from '../footer/footer';

function PageNotFound ():JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">404</h1>
          <p>Такой страницы не существует</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PageNotFound;
