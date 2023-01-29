import { useAppDispatch } from '../../hooks/useAppDispatch';

import { increaseReviewsCount } from '../../store/action';

const ShowMoreButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="review-block__buttons">
      <button
        className="btn btn--purple"
        type="button"
        onClick={() => dispatch(increaseReviewsCount())}
      >
        Показать больше отзывов
      </button>
    </div>
  );
};

export default ShowMoreButton;
