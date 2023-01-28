import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Cards from '../../components/cards/cards';
import Pagination from '../../components/pagination/pagination';

const Catalog = () => (
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
);

export default Catalog;
