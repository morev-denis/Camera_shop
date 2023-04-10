import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteItem } from '../../store/action';

import { Camera } from '../../types/camera';

ReactModal.defaultStyles = {};

type Props = {
  isBasketRemoveItemModalOpen: boolean;
  setBasketRemoveItemModalOpen: (value: boolean) => void;
  camera: Camera;
  item: { id: number; count: number };
};

const BasketRemoveItemModal = ({
  isBasketRemoveItemModalOpen,
  setBasketRemoveItemModalOpen,
  camera,
  item,
}: Props) => {
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    setBasketRemoveItemModalOpen(false);
  }, [setBasketRemoveItemModalOpen]);

  const handleEscClick = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  const handleDeleteItem = () => {
    dispatch(deleteItem({ id: item.id, count: item.count }));
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscClick);

    return () => {
      document.removeEventListener('keyup', handleEscClick);
    };
  }, [handleEscClick]);

  useEffect(() => {
    if (isBasketRemoveItemModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isBasketRemoveItemModalOpen]);

  return (
    <ReactModal isOpen={isBasketRemoveItemModalOpen} ariaHideApp={false}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${process.env.PUBLIC_URL}/${camera.previewImgWebp}, {${process.env.PUBLIC_URL}/${camera.previewImgWebp2x}}`}
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/${camera.previewImg}`}
                    srcSet={`${process.env.PUBLIC_URL}/${camera.previewImg2x}`}
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
                  <li className="basket-item__list-item">{`${camera.level} уровень`}</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={handleDeleteItem}
              >
                Удалить
              </button>
              <button className="btn btn--transparent modal__btn" onClick={closeModal}>
                Продолжить покупки
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

export default BasketRemoveItemModal;
