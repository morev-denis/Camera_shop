import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

import { Camera } from '../../types/camera';
import { Cameras } from '../../types/cameras';

import { AppRoute } from '../../const';

const FormSearch = () => {
  const [searchCameraName, setSearchCameraName] = useState<string>('');
  const [isFormSearchOpen, setFormSearchOpen] = useState(false);
  const [searchedCameras, setSearchedCameras] = useState<Cameras | null>(null);
  const navigate = useNavigate();

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

  const handleSearchedCameraClick = (camera: Camera) => {
    navigate(`${AppRoute.Cameras}/${camera.id}`);
  };

  const handleKeyDownClick = (evt: KeyboardEvent<HTMLLIElement>, camera: Camera) => {
    if (evt.key === 'Enter') {
      handleSearchedCameraClick(camera);
    }
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
              <li
                key={camera.id}
                className="form-search__select-item"
                tabIndex={0}
                onClick={() => handleSearchedCameraClick(camera)}
                onKeyDown={(evt) => handleKeyDownClick(evt, camera)}
              >
                {camera.name}
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
