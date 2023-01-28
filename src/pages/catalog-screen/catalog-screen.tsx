import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Cards from '../../components/cards/cards';
import Pagination from '../../components/pagination/pagination';
import Footer from '../../components/footer/footer';

const CatalogScreen = () => (
  <>
    <Header />

    <main>
      <div className="banner">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
          />
          <img
            src="img/content/banner-bg.jpg"
            srcSet="img/content/banner-bg@2x.jpg 2x"
            width="1280"
            height="280"
            alt="баннер"
          />
        </picture>
        <p className="banner__info">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span>
          <span className="banner__text">
            Профессиональная камера от&nbsp;известного производителя
          </span>
          <a className="btn" href="/">
            Подробнее
          </a>
        </p>
      </div>
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <CatalogFilter />
              </div>
              <div className="catalog__content">
                <CatalogSort />
                <Cards />
                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </>
);

export default CatalogScreen;
