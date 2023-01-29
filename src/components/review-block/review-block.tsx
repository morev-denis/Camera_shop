import ReviewCard from '../review-card/review-card';
import ShowMoreButton from '../show-more-button/show-more-button';

import { useAppSelector } from '../../hooks/useAppSelector';

import { Reviews } from '../../types/reviews';

type Props = {
  reviews: Reviews | null;
};

const ReviewBlock = ({ reviews }: Props) => {
  const { reviewsCount } = useAppSelector((state) => state);

  if (!reviews) {
    return <div>Нет комментариев</div>;
  }

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {reviews.slice(0, reviewsCount).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
        {reviews.length - reviewsCount > 0 && <ShowMoreButton />}
      </div>
    </section>
  );
};

export default ReviewBlock;
