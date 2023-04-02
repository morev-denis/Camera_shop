import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

ReactModal.defaultStyles = {};

type Props = {
  isProductBasketSuccessModalOpen: boolean;
  setProductBasketSuccessModalOpen: (value: boolean) => void;
};

const ProductBasketSuccessModal = ({
  isProductBasketSuccessModalOpen,
  setProductBasketSuccessModalOpen,
}: Props) => {
  const closeModal = useCallback(() => {
    setProductBasketSuccessModalOpen(false);
  }, [setProductBasketSuccessModalOpen]);

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
    if (isProductBasketSuccessModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isProductBasketSuccessModalOpen]);

  return (
    <ReactModal isOpen={isProductBasketSuccessModalOpen} ariaHideApp={false}>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link
                to={AppRoute.Root}
                className="btn btn--purple modal__btn modal__btn--fit-width"
              >
                Вернуться к покупкам
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

export default ProductBasketSuccessModal;
