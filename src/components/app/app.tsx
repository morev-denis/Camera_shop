import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainScreen from '../../pages/main-screen/main-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ItemScreen from '../../pages/item-screen/item-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

import { AppRoute } from '../../const';

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen />} />
        <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        <Route path={AppRoute.Camera} element={<ItemScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
