import { useState } from 'react';
import dayjs from 'dayjs';

import ProductReviewModal from '../product-review-modal/product-review-modal';
import ProductReviewSuccessModal from '../product-review-success-modal/product-review-success-modal';
import ReviewCard from '../review-card/review-card';
import ShowMoreButton from '../show-more-button/show-more-button';

import { useAppSelector } from '../../hooks/useAppSelector';

import { Reviews } from '../../types/reviews';
import { Camera } from '../../types/camera';

type Props = {
  reviews: Reviews | null;
  camera: Camera;
};

const ReviewBlock = ({ reviews, camera }: Props) => {
  const { reviewsCount } = useAppSelector((state) => state);

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isReviewSuccessModalOpen, setReviewSuccessModalOpen] = useState(false);

  if (!reviews) {
    return <div>Нет комментариев</div>;
  }

  const sortedReviews = [...reviews].sort((a, b) =>
    dayjs(a.createAt).isAfter(dayjs(b.createAt)) ? -1 : 1,
  );

  const handleReviewBtnClick = () => {
    setReviewModalOpen(true);
  };

  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handleReviewBtnClick}>
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {sortedReviews.slice(0, reviewsCount).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>
          {sortedReviews.length - reviewsCount > 0 && <ShowMoreButton />}
        </div>
      </section>
      {isReviewModalOpen && (
        <ProductReviewModal
          isReviewModalOpen={isReviewModalOpen}
          setReviewModalOpen={setReviewModalOpen}
          setReviewSuccessModalOpen={setReviewSuccessModalOpen}
          camera={camera}
        />
      )}
      {isReviewSuccessModalOpen && (
        <ProductReviewSuccessModal
          isReviewSuccessModalOpen={isReviewSuccessModalOpen}
          setReviewSuccessModalOpen={setReviewSuccessModalOpen}
        />
      )}
    </>
  );
};

export default ReviewBlock;
