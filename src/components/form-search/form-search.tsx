import { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

import { Cameras } from '../../types/cameras';

import { AppRoute } from '../../const';

const FormSearch = () => {
  const [searchCameraName, setSearchCameraName] = useState<string>('');
  const [isFormSearchOpen, setFormSearchOpen] = useState(false);
  const [searchedCameras, setSearchedCameras] = useState<Cameras | null>(null);

  const { cameras } = useAppSelector((state) => state);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchCameraName(evt.target.value);

    if (!evt.target.value) {
      setFormSearchOpen(false);
    } else {
      setFormSearchOpen(true);
    }
  };

  const handleResetButtonClick = () => {
    setSearchCameraName('');
    setFormSearchOpen(false);
  };

  useEffect(() => {
    let filteredCameras = null;

    if (cameras) {
      filteredCameras = cameras.filter((camera) => {
        if (searchCameraName) {
          return camera.name.includes(searchCameraName);
        } else {
          return false;
        }
      });
      setSearchedCameras(filteredCameras);
    }
  }, [searchCameraName, cameras]);

  return (
    <div className={isFormSearchOpen ? 'form-search list-opened' : 'form-search'}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchCameraName}
            onChange={handleChange}
          />
        </label>
        <ul className="form-search__select-list">
          {searchedCameras && searchedCameras?.length > 0 ? (
            searchedCameras.map((camera) => (
              <li key={camera.id} className="form-search__select-item" tabIndex={0}>
                <Link to={`${AppRoute.Cameras}/${camera.id}`}>{camera.name}</Link>
              </li>
            ))
          ) : (
            <li className="form-search__select-item">Ничего не найдено</li>
          )}
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={handleResetButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default FormSearch;
