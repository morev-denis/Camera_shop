import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';

ReactModal.defaultStyles = {};

type Props = {
  isReviewSuccessModalOpen: boolean;
  setReviewSuccessModalOpen: (value: boolean) => void;
};

const ProductReviewSuccessModal = ({
  isReviewSuccessModalOpen,
  setReviewSuccessModalOpen,
}: Props) => {
  const closeModal = useCallback(() => {
    setReviewSuccessModalOpen(false);
  }, [setReviewSuccessModalOpen]);

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
    if (isReviewSuccessModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isReviewSuccessModalOpen]);

  return (
    <ReactModal isOpen={isReviewSuccessModalOpen}>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={closeModal}
              >
                Вернуться к покупкам
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

export default ProductReviewSuccessModal;
