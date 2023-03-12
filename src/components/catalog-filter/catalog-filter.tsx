import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import CatalogPriceFilter from '../catalog-price-filter/catalog-price-filter';

import { QueryParam } from '../../const';

const CatalogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const filterGroup = evt.target.name;
    const filterName = evt.target.id;
    const currentValues = searchParams.getAll(filterGroup);

    if (currentValues.includes(filterName)) {
      searchParams.delete(filterGroup);
      currentValues
        .filter((value) => value !== filterName)
        .forEach((value) => {
          searchParams.append(filterGroup, String(value));
        });
    } else {
      searchParams.append(filterGroup, String(filterName));
    }

    setSearchParams(searchParams);
  };

  const handleResetButtonClick = () => {
    const newParams = Array.from(searchParams.entries()).filter(
      ([key, value]) => key === QueryParam.Sort || key === QueryParam.Order,
    );

    setSearchParams(newParams);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogPriceFilter />
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Category}
                id="Фотоаппарат"
                onChange={handleFilterChange}
                checked={searchParams.getAll('category').includes('Фотоаппарат')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Category}
                id="Видеокамера"
                onChange={handleFilterChange}
                checked={searchParams.getAll('category').includes('Видеокамера')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Type}
                id="Цифровая"
                onChange={handleFilterChange}
                checked={searchParams.getAll('type').includes('Цифровая')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Type}
                id="Плёночная"
                onChange={handleFilterChange}
                checked={searchParams.getAll('type').includes('Плёночная')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Type}
                id="Моментальная"
                onChange={handleFilterChange}
                checked={searchParams.getAll('type').includes('Моментальная')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Type}
                id="Коллекционная"
                onChange={handleFilterChange}
                checked={searchParams.getAll('type').includes('Коллекционная')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Level}
                id="Нулевой"
                onChange={handleFilterChange}
                checked={searchParams.getAll('level').includes('Нулевой')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Level}
                id="Любительский"
                onChange={handleFilterChange}
                checked={searchParams.getAll('level').includes('Любительский')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={QueryParam.Level}
                id="Профессиональный"
                onChange={handleFilterChange}
                checked={searchParams.getAll('level').includes('Профессиональный')}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetButtonClick}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
};

export default CatalogFilter;
