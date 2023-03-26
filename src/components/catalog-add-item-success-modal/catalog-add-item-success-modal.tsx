import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

ReactModal.defaultStyles = {};

type Props = {
  isCatalogAddItemSuccessModalOpen: boolean;
  setCatalogAddItemSuccessModalOpen: (value: boolean) => void;
};

const CatalogAddItemSuccessModal = ({
  isCatalogAddItemSuccessModalOpen,
  setCatalogAddItemSuccessModalOpen,
}: Props) => {
  const closeModal = useCallback(() => {
    setCatalogAddItemSuccessModalOpen(false);
  }, [setCatalogAddItemSuccessModalOpen]);

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
    if (isCatalogAddItemSuccessModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isCatalogAddItemSuccessModalOpen]);

  return (
    <ReactModal isOpen={isCatalogAddItemSuccessModalOpen} ariaHideApp={false}>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--transparent modal__btn" onClick={closeModal}>
                Продолжить покупки
              </button>
              <Link
                className="btn btn--purple modal__btn modal__btn--fit-width"
                to={AppRoute.Basket}
              >
                Перейти в корзину
              </Link>
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

export default CatalogAddItemSuccessModal;
