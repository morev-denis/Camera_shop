import { Camera } from '../../types/camera';

import { MAX_RATING } from '../../const';

type Props = {
  camera: Camera;
};

const Card = ({ camera }: Props) => (
  <div className="product-card is-active">
    <div className="product-card__img">
      <picture>
        <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`} />
        <img
          src={camera.previewImg}
          srcSet={camera.previewImg2x}
          width="280"
          height="240"
          alt={camera.name}
        />
      </picture>
    </div>
    <div className="product-card__info">
      <div className="rate product-card__rate">
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
      <p className="product-card__title">{camera.name}</p>
      <p className="product-card__price">
        <span className="visually-hidden">Цена:</span>
        {camera.price.toLocaleString('ru-Ru')} ₽
      </p>
    </div>
    <div className="product-card__buttons">
      <button className="btn btn--purple product-card__btn" type="button">
        Купить
      </button>
      <a className="btn btn--transparent" href="/">
        Подробнее{' '}
      </a>
    </div>
  </div>
);

export default Card;
