import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';

import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';

import Footer from '../../components/footer/footer';

const CatalogScreen = () => (
  <>
    <Helmet>
      <title>Каталог - Фотошоп</title>
    </Helmet>

    <Header />

    <main>
      <Banner />
      <div className="page-content">
        <Breadcrumbs camera={null} />
        <Catalog />
      </div>
    </main>

    <Footer />
  </>
);

export default CatalogScreen;
