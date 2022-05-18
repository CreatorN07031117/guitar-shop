import { Route, Routes } from 'react-router-dom';
import Catalog from '../catalog/catalog';
import GuitarPage from '../guitar-page/gutar-page';
import { AppRoute } from '../../const';


function App(): JSX.Element {
  return(
    <Routes>
      <Route path={AppRoute.Index}>
        <Route index element={<Catalog />} />
        <Route path='/:id' element={<Catalog />} />
      </Route>
      <Route path={AppRoute.Guitar} element={<GuitarPage />} />
    </Routes>
  );
}

export default App;
