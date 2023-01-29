import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { Review } from '../../types/review';

import { MAX_RATING } from '../../const';

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => (
  <li className="review-card">
    <div className="review-card__head">
      <p className="title title--h4">{review.userName}</p>
      <time className="review-card__data" dateTime={review.createAt}>
        {dayjs(review.createAt).locale('ru').format('DD MMMM')}
      </time>
    </div>
    <div className="rate review-card__rate">
      {Array.from({ length: MAX_RATING }, (element, i) =>
        i <= review.rating ? (
          <svg key={i} width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
        ) : (
          <svg key={i} width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
        ),
      )}
      <p className="visually-hidden">Оценка: {review.rating}</p>
    </div>
    <ul className="review-card__list">
      <li className="item-list">
        <span className="item-list__title">Достоинства:</span>
        <p className="item-list__text">{review.advantage}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Недостатки:</span>
        <p className="item-list__text">{review.disadvantage}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Комментарий:</span>
        <p className="item-list__text">{review.review}</p>
      </li>
    </ul>
  </li>
);

export default ReviewCard;
