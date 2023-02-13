import { useState } from 'react';
import { Link } from 'react-router-dom';

import StarRating from '../../components/star-rating/star-rating';
import CatalogAddItemModal from '../../components/catalog-add-item-modal/catalog-add-item-modal';

import { Camera } from '../../types/camera';

import { AppRoute } from '../../const';

type Props = {
  camera: Camera;
};

const Card = ({ camera }: Props) => {
  const [isCatalogAddItemModalOpen, setCatalogAddItemModalOpen] = useState(false);

  const handleAddBasketBtnClick = () => {
    setCatalogAddItemModalOpen(true);
  };

  return (
    <div className="product-card is-active">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${process.env.PUBLIC_URL}/${camera.previewImgWebp}, {${process.env.PUBLIC_URL}/${camera.previewImgWebp2x}}`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/${camera.previewImg}`}
            srcSet={`${process.env.PUBLIC_URL}/${camera.previewImg2x}`}
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
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleAddBasketBtnClick}
        >
          Купить
        </button>
        <Link to={`${AppRoute.Cameras}/${camera.id}`} className="btn btn--transparent">
          Подробнее{' '}
        </Link>
      </div>

      {isCatalogAddItemModalOpen && (
        <CatalogAddItemModal
          isCatalogAddItemModalOpen={isCatalogAddItemModalOpen}
          setCatalogAddItemModalOpen={setCatalogAddItemModalOpen}
          camera={camera}
        />
      )}
    </div>
  );
};

export default Card;
