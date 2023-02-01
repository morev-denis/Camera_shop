import { MAX_RATING } from '../../const';

type Props = {
  rating: number;
};

const StarRating = ({ rating }: Props) => (
  <>
    {Array.from({ length: MAX_RATING }, (element, i) =>
      i < rating ? (
        <svg key={i} width="17" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
      ) : (
        <svg key={i} width="17" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg>
      ),
    )}
  </>
);

export default StarRating;
