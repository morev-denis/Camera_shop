import Card from '../card/card';

import { Cameras } from '../../types/cameras';

type Props = {
  similarCameras: Cameras | null;
};

const SimilarProducts = ({ similarCameras }: Props) => (
  <section className="product-similar">
    <div className="container">
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <div className="product-similar__slider-list">
          {similarCameras?.slice(0, 3).map((similarCamera) => (
            <Card key={similarCamera.id} camera={similarCamera} />
          ))}
        </div>
        <button
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          disabled
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <button
          className="slider-controls slider-controls--next"
          type="button"
          aria-label="Следующий слайд"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default SimilarProducts;
