import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import {
  fetchCameraAction,
  fetchReviewsAction,
  fetchSimilarCamerasAction,
} from '../../store/api-actions';

import Header from '../../components/header/header';

import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

import SimilarCameras from '../../components/similar-cameras/similar-cameras';
import ReviewBlock from '../../components/review-block/review-block';

import Footer from '../../components/footer/footer';

import NotFoundScreen from '../not-found-screen/not-found-screen';

import { MAX_RATING } from '../../const';

const ItemScreen = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { camera, reviews, similarCameras } = useAppSelector((state) => state);

  useEffect(() => {
    if (params.cameraId) {
      dispatch(fetchCameraAction(Number(params.cameraId)));
      dispatch(fetchReviewsAction(Number(params.cameraId)));
      dispatch(fetchSimilarCamerasAction(Number(params.cameraId)));
    }
  }, [dispatch, params.cameraId]);

  if (!camera) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Header />

      <main>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`}
                    />
                    <img
                      src={camera.previewImg}
                      srcSet={camera.previewImg2x}
                      width="560"
                      height="480"
                      alt={camera.name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    {Array.from({ length: MAX_RATING }, (element, i) =>
                      i <= camera.rating ? (
                        <svg key={i} width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                      ) : (
                        <svg key={i} width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      ),
                    )}

                    <p className="visually-hidden">Рейтинг: {camera.rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>
                      {camera.reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>
                    {camera.price.toLocaleString('ru-Ru')} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">
                        Характеристики
                      </button>
                      <button className="tabs__control is-active" type="button">
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text">{camera.vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{camera.category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{camera.type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{camera.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>{camera.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            {similarCameras && <SimilarCameras similarCameras={similarCameras} />}
          </div>
          <div className="page-content__section">
            <ReviewBlock reviews={reviews} />
          </div>
        </div>
      </main>

      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>

      <Footer />
    </>
  );
};

export default ItemScreen;
