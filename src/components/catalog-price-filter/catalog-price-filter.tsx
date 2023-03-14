import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

import { QueryParam } from '../../const';

const CatalogPriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { minPrice, maxPrice } = useAppSelector((state) => state);

  let { minPriceFiltered, maxPriceFiltered } = useAppSelector((state) => state);

  const [minPriceValue, setMinPriceValue] = useState(
    Number(searchParams.get(QueryParam.MinPrice) || '0'),
  );

  const [maxPriceValue, setMaxPriceValue] = useState(
    Number(searchParams.get(QueryParam.MaxPrice) || '0'),
  );

  const handleMinPriceValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      setMinPriceValue(0);
    } else {
      setMinPriceValue(Number(evt.target.value));
    }
  };

  const handleMinPriceValueBlur = () => {
    if (!minPriceValue) {
      searchParams.delete(QueryParam.MinPrice);
    } else {
      minPriceFiltered = minPrice;

      let newValue = Math.max(minPriceValue, minPriceFiltered);
      newValue = Math.min(newValue, maxPriceValue || maxPriceFiltered);

      setMinPriceValue(newValue);
      searchParams.set(QueryParam.MinPrice, String(newValue));
    }

    setSearchParams(searchParams);
  };

  const handleMaxPriceValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      setMaxPriceValue(0);
    } else {
      setMaxPriceValue(Number(evt.target.value));
    }
  };

  const handleMaxPriceValueBlur = () => {
    if (!maxPriceValue) {
      searchParams.delete(QueryParam.MaxPrice);
    } else {
      maxPriceFiltered = maxPrice;
      let newValue = Math.min(maxPriceValue, maxPriceFiltered);
      newValue = Math.max(newValue, minPriceValue || minPriceFiltered);
      setMaxPriceValue(newValue);
      searchParams.set(QueryParam.MaxPrice, String(newValue));
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (minPriceFiltered && minPriceValue) {
      setMinPriceValue(Math.max(minPriceValue, minPriceFiltered));
    }

    if (maxPriceFiltered && maxPriceValue) {
      setMaxPriceValue(Math.min(maxPriceValue, maxPriceFiltered));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPriceFiltered, maxPriceFiltered]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              data-testid="price"
              onBlur={handleMinPriceValueBlur}
              onChange={handleMinPriceValueChange}
              type="number"
              name="price"
              placeholder={String(minPriceFiltered)}
              value={minPriceValue ? minPriceValue : ''}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              data-testid="priceUp"
              onBlur={handleMaxPriceValueBlur}
              onChange={handleMaxPriceValueChange}
              type="number"
              name="priceUp"
              placeholder={String(maxPriceFiltered)}
              value={maxPriceValue ? maxPriceValue : ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default CatalogPriceFilter;
