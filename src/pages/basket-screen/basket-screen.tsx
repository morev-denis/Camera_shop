import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';

import Footer from '../../components/footer/footer';

const BasketScreen = () => (
  <>
    <Helmet>
      <title>Каталог - Фотошоп</title>
    </Helmet>

    <Header />

    <main>
      <h1>Корзина</h1>
    </main>

    <Footer />
  </>
);

export default BasketScreen;
