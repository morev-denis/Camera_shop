import { useState } from 'react';

import Card from '../card/card';

import { Cameras } from '../../types/cameras';

import { SIMILAR_CAMERAS_PER_PAGE } from '../../const';

type Props = {
  similarCameras: Cameras | null;
};

const SimilarCameras = ({ similarCameras }: Props) => {
  const [lastContentIndex, setLastContentIndex] = useState(SIMILAR_CAMERAS_PER_PAGE);

  const firstContentIndex = lastContentIndex - SIMILAR_CAMERAS_PER_PAGE;

  const prevBtnClickHandler = () => {
    setLastContentIndex((prevState) => prevState - 1);
  };

  const nextBtnClickHandler = () => {
    setLastContentIndex((prevState) => prevState + 1);
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarCameras?.slice(firstContentIndex, lastContentIndex).map((similarCamera) => (
              <Card key={similarCamera.id} camera={similarCamera} />
            ))}
          </div>
          <button
            onClick={prevBtnClickHandler}
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={firstContentIndex === 0}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            onClick={nextBtnClickHandler}
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={lastContentIndex === similarCameras?.length}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimilarCameras;
