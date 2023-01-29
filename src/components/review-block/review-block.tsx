import ReviewCard from '../review-card/review-card';

import { Reviews } from '../../types/reviews';

type Props = {
  reviews: Reviews | null;
};

const ReviewBlock = ({ reviews }: Props) => (
  <section className="review-block">
    <div className="container">
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button className="btn" type="button">
          Оставить свой отзыв
        </button>
      </div>
      <ul className="review-block__list">
        {reviews?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
      <div className="review-block__buttons">
        <button className="btn btn--purple" type="button">
          Показать больше отзывов
        </button>
      </div>
    </div>
  </section>
);

export default ReviewBlock;
