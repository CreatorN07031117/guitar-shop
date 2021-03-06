import {Route, Routes, Navigate} from 'react-router-dom';
import Catalog from '../catalog/catalog';
import GuitarPage from '../guitar-page/gutar-page';
import PageNotFound from '../page-not-found/page-not-found';
import Cart from '../cart/cart';
import {AppRoute} from '../../const';


function App(): JSX.Element {

  return(
    <Routes>
      <Route path={AppRoute.Index}>
        <Route index element={<Catalog />} />
        <Route path='/:id' element={<Catalog />} />
        <Route path={AppRoute.Catalog} element={<Navigate to={AppRoute.Index} />} />
        <Route path={AppRoute.Guitar} element={<GuitarPage />} />
        <Route path={AppRoute.Cart} element={<Cart />} />
      </Route>
      <Route path={AppRoute.NotFound} element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
