import { ChangeEvent, useState } from 'react';

import { Camera } from '../../types/camera';

import { MIN_ITEM_COUNT, MAX_ITEM_COUNT } from '../../const';

type Props = {
  camera: Camera;
};

const BasketItem = ({ camera }: Props) => {
  const [count, setCount] = useState(1);

  const handlePrevBtnClick = () => {
    setCount((prev) => prev - 1);
  };

  const handleNextBtnClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) <= MIN_ITEM_COUNT) {
      setCount(MIN_ITEM_COUNT);
      return;
    }

    if (Number(evt.target.value) > MAX_ITEM_COUNT) {
      setCount(MAX_ITEM_COUNT);
      return;
    }

    setCount(Number(evt.target.value));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
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
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.category}</li>
          <li className="basket-item__list-item">{`${camera.level} уровень`}</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {camera.price.toLocaleString('ru-Ru')} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          disabled={count <= MIN_ITEM_COUNT}
          aria-label="уменьшить количество товара"
          onClick={handlePrevBtnClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter2"></label>
        <input
          type="number"
          id="counter2"
          value={count}
          min="1"
          max="99"
          aria-label="количество товара"
          onChange={handleInputChange}
        />
        <button
          className="btn-icon btn-icon--next"
          disabled={count >= MAX_ITEM_COUNT}
          aria-label="увеличить количество товара"
          onClick={handleNextBtnClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {(camera.price * count).toLocaleString('ru-Ru')} ₽
      </div>
      <button
        className="cross-btn"
        disabled={count >= MAX_ITEM_COUNT}
        type="button"
        aria-label="Удалить товар"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};

export default BasketItem;
