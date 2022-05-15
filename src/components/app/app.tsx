import { Route, Routes } from 'react-router-dom';
import Catalog from '../catalog/catalog';
import GuitarPage from '../guitar-page/gutar-page';
import { AppRoute } from '../../const';


function App(): JSX.Element {
  return(
    <Routes>
      <Route path={AppRoute.Index} element={<Catalog />} />
      <Route path={AppRoute.Guitar} element={<GuitarPage />} />
    </Routes>
  );
}

export default App;
