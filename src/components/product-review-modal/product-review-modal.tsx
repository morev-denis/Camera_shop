import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ReactModal from 'react-modal';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { postReviewAction } from '../../store/api-actions';

import { ReviewPost } from '../../types/review-post';
import { Camera } from '../../types/camera';

ReactModal.setAppElement('#root');
ReactModal.defaultStyles = {};

type Props = {
  isReviewModalOpen: boolean;
  setReviewModalOpen: (value: boolean) => void;
  camera: Camera;
};

const ProductReviewModal = ({ isReviewModalOpen, setReviewModalOpen, camera }: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ReviewPost>({
    cameraId: camera.id,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 1,
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setFormData({ ...formData, rating: Number(value) });
  };

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setFormData({ ...formData, userName: value });
  };

  const handleAdvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setFormData({ ...formData, advantage: value });
  };

  const handleDisadvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setFormData({ ...formData, disadvantage: value });
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.target.value;

    setFormData({ ...formData, review: value });
  };

  const onSubmit = async () => {
    await dispatch(postReviewAction(formData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit();
  };

  const closeModal = () => {
    setReviewModalOpen(false);
  };

  const handleEscClick = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscClick);

    return () => {
      document.removeEventListener('keyup', handleEscClick);
    };
  });

  return (
    <ReactModal isOpen={isReviewModalOpen}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form method="post" onSubmit={handleSubmit}>
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item">
                    <legend className="rate__caption">
                      Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        <input
                          className="visually-hidden"
                          id="star-5"
                          name="rate"
                          type="radio"
                          value="5"
                          onChange={handleRatingChange}
                        />
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input
                          className="visually-hidden"
                          id="star-4"
                          name="rate"
                          type="radio"
                          value="4"
                          onChange={handleRatingChange}
                        />
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input
                          className="visually-hidden"
                          id="star-3"
                          name="rate"
                          type="radio"
                          value="3"
                          onChange={handleRatingChange}
                        />
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input
                          className="visually-hidden"
                          id="star-2"
                          name="rate"
                          type="radio"
                          value="2"
                          onChange={handleRatingChange}
                        />
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input
                          className="visually-hidden"
                          id="star-1"
                          name="rate"
                          type="radio"
                          value="1"
                          onChange={handleRatingChange}
                        />
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">0</span> <span>/</span>
                        <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">
                        Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-name"
                        placeholder="Введите ваше имя"
                        required
                        value={formData.userName}
                        onChange={handleNameChange}
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">
                        Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-plus"
                        placeholder="Основные преимущества товара"
                        required
                        value={formData.advantage}
                        onChange={handleAdvantageChange}
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать достоинства</p>
                  </div>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">
                        Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-minus"
                        placeholder="Главные недостатки товара"
                        required
                        value={formData.disadvantage}
                        onChange={handleDisadvantageChange}
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать недостатки</p>
                  </div>
                  <div className="custom-textarea form-review__item">
                    <label>
                      <span className="custom-textarea__label">
                        Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea
                        name="user-comment"
                        minLength={5}
                        placeholder="Поделитесь своим опытом покупки"
                        value={formData.review}
                        onChange={handleReviewChange}
                      >
                      </textarea>
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">
                  Отправить отзыв
                </button>
              </form>
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

export default ProductReviewModal;
