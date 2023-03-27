import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';

import BasketItem from '../../components/basket-item/basket-item';

import Footer from '../../components/footer/footer';

import { useAppSelector } from '../../hooks/useAppSelector';
import { AppRoute } from '../../const';

const BasketScreen = () => {
  const { basket } = useAppSelector((state) => state);

  return (
    <>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>

      <Header />

      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {basket.map((camera) => (
                  <BasketItem key={camera.id} camera={camera} />
                ))}
              </ul>
              {basket.length > 0 ? (
                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">
                      Если у вас есть промокод на скидку, примените его в этом поле
                    </p>
                    <div className="basket-form">
                      <form action="#">
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Промокод</span>
                            <input type="text" name="promo" placeholder="Введите промокод" />
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button className="btn" type="submit">
                          Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Всего:</span>
                      <span className="basket__summary-value">111 390 ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span className="basket__summary-value basket__summary-value--bonus">
                        0 ₽
                      </span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">
                        К оплате:
                      </span>
                      <span className="basket__summary-value basket__summary-value--total">
                        111 390 ₽
                      </span>
                    </p>
                    <button className="btn btn--purple" type="submit">
                      Оформить заказ
                    </button>
                  </div>
                </div>
              ) : (
                <h2>Корзина пуста</h2>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BasketScreen;
