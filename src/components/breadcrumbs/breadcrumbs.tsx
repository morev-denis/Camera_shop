import { NavLink } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

type Props = {
  camera: Camera | null;
};

const Breadcrumbs = ({ camera }: Props) => (
  <div className="breadcrumbs">
    <div className="container">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <NavLink className="breadcrumbs__link" to={AppRoute.Root} end>
            Главная
            <svg width="5" height="8" aria-hidden="true">
              <use xlinkHref="#icon-arrow-mini"></use>
            </svg>
          </NavLink>
        </li>
        <li className="breadcrumbs__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'breadcrumbs__link breadcrumbs__link--active' : 'breadcrumbs__link'}
            to={AppRoute.Root}
            end
          >
            Каталог
            {camera && (
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            )}
          </NavLink>
        </li>
        {camera && (
          <li className="breadcrumbs__item">
            <NavLink className="breadcrumbs__link breadcrumbs__link--active" to={AppRoute.Root} end>
              {camera.name}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  </div>
);

export default Breadcrumbs;
