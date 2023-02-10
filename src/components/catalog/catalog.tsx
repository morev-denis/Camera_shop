import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

import usePagination from '../../hooks/usePagination';

import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Cards from '../../components/cards/cards';
import Pagination from '../../components/pagination/pagination';

import { CONTENT_PER_PAGE } from '../../const';

import styles from './catalog.module.css';

const Catalog = () => {
  const params = useParams();

  const { cameras } = useAppSelector((state) => state);

  const { totalPages, firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage } =
    usePagination({
      contentPerPage: CONTENT_PER_PAGE,
      count: cameras ? cameras.length : 0,
    });

  useEffect(() => {
    setPage(Number(params.pageNumber));
  });

  if (!cameras) {
    return <div className={styles.error}>Произошла ошибка при загрузке данных камер</div>;
  }

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            <Cards cameras={cameras.slice(firstContentIndex, lastContentIndex)} />
            <Pagination
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
