import { Helmet } from 'react-helmet-async';

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

import StarRating from '../../components/star-rating/star-rating';
import Tabs from '../../components/tabs/tabs';
import SimilarCameras from '../../components/similar-cameras/similar-cameras';
import ReviewBlock from '../../components/review-block/review-block';

import Footer from '../../components/footer/footer';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute } from '../../const';

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
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>

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
                    <StarRating rating={camera.rating} />

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
                  <Tabs camera={camera} />
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            {similarCameras && <SimilarCameras similarCameras={similarCameras} />}
          </div>
          <div className="page-content__section">
            {reviews && <ReviewBlock reviews={reviews} />}
          </div>
        </div>
      </main>

      <a className="up-btn" href={`${AppRoute.Cameras}/${String(params.cameraId)}#header`}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>

      <Footer />
    </>
  );
};

export default ItemScreen;
