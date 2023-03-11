import { ChangeEvent, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import usePagination from '../../hooks/usePagination';

import Cards from '../../components/cards/cards';
import Pagination from '../../components/pagination/pagination';

// import { updateQueryParams } from '../../store/action';
import { fetchSortedCamerasAction } from '../../store/api-actions';

import { CONTENT_PER_PAGE, SortType, OrderType } from '../../const';

import styles from './catalog.module.css';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { cameras, queryParams } = useAppSelector((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsSort = useMemo(
    () => ({
      _sort: searchParams.get('_sort'),
      _order: searchParams.get('_order'),
    }),
    [searchParams],
  );

  if (searchParams.has('_sort') && !searchParams.has('_order')) {
    searchParams.set('_order', 'asc');
    setSearchParams(searchParams);
  }

  if (searchParams.has('_order') && !searchParams.has('_sort')) {
    searchParams.set('_sort', 'price');
  }

  const handleSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    searchParams.set('_sort', String(evt.target.dataset.sort));

    setSearchParams(searchParams);
  };

  const handleOrderChange = (evt: ChangeEvent<HTMLInputElement>) => {
    searchParams.set('_order', String(evt.target.dataset.order));

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

  if (!cameras) {
    return <div className={styles.error}>Произошла ошибка при загрузке данных камер</div>;
  }

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <div className="catalog-filter">
              <form action="#">
                <h2 className="visually-hidden">Фильтр</h2>
                <fieldset className="catalog-filter__block">
                  <legend className="title title--h5">Цена, ₽</legend>
                  <div className="catalog-filter__price-range">
                    <div className="custom-input">
                      <label>
                        <input type="number" name="price" placeholder="от" />
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <input type="number" name="priceUp" placeholder="до" />
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="title title--h5">Категория</legend>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="photocamera" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Фотокамера</span>
                    </label>
                  </div>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="videocamera" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Видеокамера</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="title title--h5">Тип камеры</legend>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="digital" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Цифровая</span>
                    </label>
                  </div>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="film" disabled />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Плёночная</span>
                    </label>
                  </div>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="snapshot" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Моментальная</span>
                    </label>
                  </div>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="collection" disabled />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Коллекционная</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="title title--h5">Уровень</legend>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="zero" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Нулевой</span>
                    </label>
                  </div>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="non-professional" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Любительский</span>
                    </label>
                  </div>
                  <div className="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="professional" />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">Профессиональный</span>
                    </label>
                  </div>
                </fieldset>
                <button className="btn catalog-filter__reset-btn" type="reset">
                  Сбросить фильтры
                </button>
              </form>
            </div>
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
                        name="_sort"
                        defaultChecked={queryParams._sort === SortType.Price}
                        data-sort="price"
                        onChange={handleSortChange}
                      />
                      <label htmlFor="sortPrice">по цене</label>
                    </div>
                    <div className="catalog-sort__btn-text">
                      <input
                        type="radio"
                        id="sortPopular"
                        name="_sort"
                        defaultChecked={queryParams._sort === SortType.Rating}
                        data-sort="rating"
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
                        data-order="asc"
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
                        data-order="desc"
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
