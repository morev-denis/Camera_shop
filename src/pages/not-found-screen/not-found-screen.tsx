import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import { AppRoute } from '../../const';

const NotFoundScreen = () => (
  <>
    <Header />

    <main style={{ textAlign: 'center' }}>
      <h1>404. Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </main>

    <Footer />
  </>
);

export default NotFoundScreen;
