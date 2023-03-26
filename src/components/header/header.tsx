import { Link } from 'react-router-dom';

import FormSearch from '../form-search/form-search';

import { useAppSelector } from '../../hooks/useAppSelector';

import { AppRoute } from '../../const';

const Header = () => {
  const { basket } = useAppSelector((state) => state);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Root}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basket.length !== 0 && <span className="header__basket-count">{basket.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
