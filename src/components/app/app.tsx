import { Route, Routes, BrowserRouter } from 'react-router-dom';

import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ItemScreen from '../../pages/item-screen/item-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

import { AppRoute } from '../../const';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Root} element={<CatalogScreen />} />
      <Route path={AppRoute.Camera} element={<ItemScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </BrowserRouter>
);

export default App;
