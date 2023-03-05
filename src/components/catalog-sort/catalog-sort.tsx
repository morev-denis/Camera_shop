import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { fetchSortedCamerasAction } from '../../store/api-actions';
import { updateQueryParams } from '../../store/action';

import { SortType, OrderType } from '../../const';

const CatalogSort = () => {
  const dispatch = useAppDispatch();
  const { queryParams } = useAppSelector((state) => state);
  const [, setSearchParams] = useSearchParams();

  const handleSortByPriceBtnClick = () => {
    dispatch(updateQueryParams({ _sort: 'price' }));
  };

  const handleSortByPopularBtnClick = () => {
    dispatch(updateQueryParams({ _sort: 'rating' }));
  };

  const handleSortOrderUpBtnClick = () => {
    dispatch(updateQueryParams({ _order: 'asc' }));
  };

  const handleSortOrderDownBtnClick = () => {
    dispatch(updateQueryParams({ _order: 'desc' }));
  };

  useEffect(() => {
    setSearchParams(queryParams);
    dispatch(fetchSortedCamerasAction(queryParams));
  }, [dispatch, queryParams]);

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
                defaultChecked={queryParams._sort === SortType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text" onClick={handleSortByPopularBtnClick}>
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                defaultChecked={queryParams._sort === SortType.Rating}
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
                defaultChecked={queryParams._order === OrderType.Asc}
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
                defaultChecked={queryParams._order === OrderType.Desc}
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
