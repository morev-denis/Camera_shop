import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import { AppRoute } from '../../const';

import styles from './not-found-screen.module.css';

const NotFoundScreen = () => (
  <>
    <Helmet>
      <title>Страница не найдена - Фотошоп</title>
    </Helmet>

    <Header />

    <main className={styles.main}>
      <h1>404. Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </main>

    <Footer />
  </>
);

export default NotFoundScreen;
