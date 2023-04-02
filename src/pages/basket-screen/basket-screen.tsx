import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';

import BasketItem from '../../components/basket-item/basket-item';

import Footer from '../../components/footer/footer';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import { AppRoute } from '../../const';
import { postPromoAction } from '../../store/api-actions';

const BasketScreen = () => {
  const dispatch = useAppDispatch();
  const { basket, cameras, discount, isValidDiscount, isInvalidDiscount } = useAppSelector(
    (state) => state,
  );

  const summary = basket.reduce((acc: number, curr): number => {
    if (cameras) {
      const index = cameras.findIndex((el) => el.id === curr.id);
      return acc + cameras[index].price * curr.count;
    }
    return 0;
  }, 0);

  const [promo, setPromo] = useState('');

  const handlePromoInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromo(evt.target.value);
  };

  const handlePromoSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postPromoAction({ coupon: promo }));
  };

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
                {basket.map((item) => (
                  <BasketItem key={item.id} item={item} />
                ))}
              </ul>
              {basket.length > 0 ? (
                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">
                      Если у вас есть промокод на скидку, примените его в этом поле
                    </p>
                    <div className="basket-form">
                      <form onSubmit={handlePromoSubmit}>
                        <div
                          className={`custom-input ${isValidDiscount ? 'is-valid' : ''} ${
                            isInvalidDiscount ? 'is-invalid' : ''
                          }`}
                        >
                          <label>
                            <span className="custom-input__label">Промокод</span>
                            <input
                              type="text"
                              name="promo"
                              placeholder="Введите промокод"
                              value={promo}
                              onChange={handlePromoInput}
                            />
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
                      <span className="basket__summary-value">
                        {summary.toLocaleString('ru-RU')} ₽
                      </span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span
                        className={
                          discount
                            ? 'basket__summary-value basket__summary-value--bonus'
                            : 'basket__summary-value'
                        }
                      >
                        {((summary * discount) / 100).toLocaleString('ru-RU')} ₽
                      </span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">
                        К оплате:
                      </span>
                      <span className="basket__summary-value basket__summary-value--total">
                        {(summary - (summary * discount) / 100).toLocaleString('ru-RU')} ₽
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
