import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import { Camera } from '../../types/camera';

ReactModal.defaultStyles = {};

type Props = {
  isCatalogAddItemModalOpen: boolean;
  setCatalogAddItemModalOpen: (value: boolean) => void;
  camera: Camera;
};

const CatalogAddItemModal = ({
  isCatalogAddItemModalOpen,
  setCatalogAddItemModalOpen,
  camera,
}: Props) => {
  const closeModal = useCallback(() => {
    setCatalogAddItemModalOpen(false);
  }, [setCatalogAddItemModalOpen]);

  const handleEscClick = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscClick);

    return () => {
      document.removeEventListener('keyup', handleEscClick);
    };
  }, [handleEscClick]);

  useEffect(() => {
    if (isCatalogAddItemModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isCatalogAddItemModalOpen]);

  return (
    <ReactModal isOpen={isCatalogAddItemModalOpen}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`}
                  />
                  <img
                    src={camera.previewImg}
                    srcSet={camera.previewImg2x}
                    width="140"
                    height="120"
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
                  <li className="basket-item__list-item">{camera.type}</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>
                  {camera.price.toLocaleString('ru-Ru')} ₽
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={closeModal}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CatalogAddItemModal;
