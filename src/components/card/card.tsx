import StarRating from '../../components/star-rating/star-rating';

import { Camera } from '../../types/camera';

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
        <StarRating rating={camera.rating} />

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
