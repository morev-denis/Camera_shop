import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { fetchSortedCamerasAction } from '../../store/api-actions';

import { SortType, OrderType, QueryParam } from '../../const';

const CatalogSort = () => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortParams, setSortParams] = useState<{ _sort: string; _order: string }>({
    _sort: searchParams.get(QueryParam.Sort) || '',
    _order: searchParams.get(QueryParam.Order) || '',
  });

  const handleSortByPriceBtnClick = () => {
    setSortParams((state) => ({ ...state, _sort: SortType.Price }));
    setSearchParams(sortParams);
  };

  const handleSortByPopularBtnClick = () => {
    setSortParams((state) => ({ ...state, _sort: SortType.Rating }));
    setSearchParams(sortParams);
  };

  const handleSortOrderUpBtnClick = () => {
    if (!sortParams._sort) {
      setSortParams((state) => ({ ...state, _sort: SortType.Price }));
      setSearchParams({ _sort: SortType.Price, _order: OrderType.Asc });
    }
    setSortParams((state) => ({ ...state, _order: OrderType.Asc }));
    setSearchParams({ _sort: SortType.Price, _order: OrderType.Asc });
  };

  const handleSortOrderDownBtnClick = () => {
    if (!sortParams._sort) {
      setSortParams((state) => ({ ...state, _sort: SortType.Price }));
      setSearchParams({ _sort: SortType.Price, _order: OrderType.Desc });
    }
    setSortParams((state) => ({ ...state, _order: OrderType.Desc }));
    setSearchParams({ _sort: SortType.Price, _order: OrderType.Desc });
  };

  useEffect(() => {
    dispatch(fetchSortedCamerasAction(sortParams));
  }, [dispatch, sortParams]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text" onClick={handleSortByPriceBtnClick}>
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                defaultChecked={sortParams._sort === SortType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text" onClick={handleSortByPopularBtnClick}>
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                defaultChecked={sortParams._sort === SortType.Rating}
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
                onClick={handleSortOrderUpBtnClick}
                defaultChecked={sortParams._order === OrderType.Asc}
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
                onClick={handleSortOrderDownBtnClick}
                defaultChecked={sortParams._order === OrderType.Desc}
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
  );
};

export default CatalogSort;
