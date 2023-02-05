import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainScreen from '../../pages/main-screen/main-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ItemScreen from '../../pages/item-screen/item-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

import { AppRoute } from '../../const';

const App = () => (
  <HelmetProvider>
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen />} />
        <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        <Route path={AppRoute.Camera} element={<ItemScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  </HelmetProvider>
);

export default App;
