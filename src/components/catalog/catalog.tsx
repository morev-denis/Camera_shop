import { ChangeEvent, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import usePagination from '../../hooks/usePagination';

import Cards from '../../components/cards/cards';
import CatalogFilter from '../catalog-filter/catalog-filter';
import Pagination from '../../components/pagination/pagination';

import {
  fetchSortedCamerasAction,
  fetchCamerasMinPrice,
  fetchCamerasMaxPrice,
  fetchCamerasMinPriceFiltered,
  fetchCamerasMaxPriceFiltered,
} from '../../store/api-actions';

import { CONTENT_PER_PAGE, SortType, OrderType, QueryParam } from '../../const';

import styles from './catalog.module.css';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { cameras, queryParams } = useAppSelector((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsSort = useMemo(
    () => ({
      _sort: searchParams.get(QueryParam.Sort),
      _order: searchParams.get(QueryParam.Order),
      category: searchParams.getAll(QueryParam.Category),
      type: searchParams.getAll(QueryParam.Type),
      level: searchParams.getAll(QueryParam.Level),
      minPrice: searchParams.get(QueryParam.MinPrice),
      maxPrice: searchParams.get(QueryParam.MaxPrice),
    }),
    [searchParams],
  );

  if (searchParams.has(QueryParam.Sort) && !searchParams.has(QueryParam.Order)) {
    searchParams.set(QueryParam.Order, OrderType.Asc);
    setSearchParams(searchParams);
  }

  if (searchParams.has(QueryParam.Order) && !searchParams.has(QueryParam.Sort)) {
    searchParams.set(QueryParam.Sort, SortType.Price);
  }

  const handleSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    searchParams.set(QueryParam.Sort, String(evt.target.dataset.sort));

    setSearchParams(searchParams);
  };

  const handleOrderChange = (evt: ChangeEvent<HTMLInputElement>) => {
    searchParams.set(QueryParam.Order, String(evt.target.dataset.order));

    setSearchParams(searchParams);
  };

  const { totalPages, firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage } =
    usePagination({
      contentPerPage: CONTENT_PER_PAGE,
      count: cameras ? cameras.length : 0,
    });

  useEffect(() => {
    setPage(Number(params.pageNumber));
  });

  useEffect(() => {
    dispatch(fetchSortedCamerasAction(paramsSort));
  }, [dispatch, paramsSort]);

  useEffect(() => {
    dispatch(fetchCamerasMinPrice());
    dispatch(fetchCamerasMaxPrice());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchCamerasMinPriceFiltered({
        params: {
          category: paramsSort.category,
          type: paramsSort.type,
          level: paramsSort.level,
          minPrice: paramsSort.minPrice,
          maxPrice: paramsSort.maxPrice,
        },
      }),
    );

    dispatch(
      fetchCamerasMaxPriceFiltered({
        params: {
          category: paramsSort.category,
          type: paramsSort.type,
          level: paramsSort.level,
          minPrice: paramsSort.minPrice,
          maxPrice: paramsSort.maxPrice,
        },
      }),
    );
  }, [
    dispatch,
    paramsSort.category.join(','),
    paramsSort.level.join(','),
    paramsSort.type.join(','),
    paramsSort.minPrice,
    paramsSort.maxPrice,
  ]);

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
          <div className="catalog__content" data-testid="catalog__sort">
            <div className="catalog-sort">
              <form action="#">
                <div className="catalog-sort__inner">
                  <p className="title title--h5">Сортировать:</p>
                  <div className="catalog-sort__type">
                    <div className="catalog-sort__btn-text">
                      <input
                        type="radio"
                        id="sortPrice"
                        name={QueryParam.Sort}
                        defaultChecked={queryParams._sort === SortType.Price}
                        data-sort={SortType.Price}
                        onChange={handleSortChange}
                      />
                      <label htmlFor="sortPrice">по цене</label>
                    </div>
                    <div className="catalog-sort__btn-text">
                      <input
                        type="radio"
                        id="sortPopular"
                        name={QueryParam.Sort}
                        defaultChecked={queryParams._sort === SortType.Rating}
                        data-sort={SortType.Rating}
                        onChange={handleSortChange}
                      />
                      <label htmlFor="sortPopular">по популярности</label>
                    </div>
                  </div>
                  <div className="catalog-sort__order">
                    <div className="catalog-sort__btn catalog-sort__btn--up">
                      <input
                        type="radio"
                        id="up"
                        name="sort-icon"
                        aria-label="По возрастанию"
                        defaultChecked={queryParams._order === OrderType.Asc}
                        data-order={OrderType.Asc}
                        onChange={handleOrderChange}
                      />
                      <label htmlFor="up">
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-sort"></use>
                        </svg>
                      </label>
                    </div>
                    <div className="catalog-sort__btn catalog-sort__btn--down">
                      <input
                        type="radio"
                        id="down"
                        name="sort-icon"
                        aria-label="По убыванию"
                        defaultChecked={queryParams._order === OrderType.Desc}
                        data-order={OrderType.Desc}
                        onChange={handleOrderChange}
                      />
                      <label htmlFor="down">
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-sort"></use>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
