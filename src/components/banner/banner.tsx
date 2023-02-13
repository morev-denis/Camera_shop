import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

import { AppRoute } from '../../const';

import styles from './banner.module.css';

const Banner = () => {
  const { promo } = useAppSelector((state) => state);

  if (promo) {
    return (
      <div className="banner">
        <picture>
          <source
            type="image/webp"
            srcSet={`${process.env.PUBLIC_URL}/${promo.previewImgWebp}, ${process.env.PUBLIC_URL}/${promo.previewImgWebp2x}`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/${promo.previewImg}`}
            srcSet={`${process.env.PUBLIC_URL}/{promo.previewImg2x}`}
            width="1280"
            height="280"
            alt="баннер"
          />
        </picture>
        <p className="banner__info">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">{promo.name}</span>
          <span className="banner__text">
            Профессиональная камера от&nbsp;известного производителя
          </span>
          <Link className="btn" to={`${AppRoute.Cameras}/${promo.id}`}>
            Подробнее
          </Link>
        </p>
      </div>
    );
  } else {
    return <div className={styles.error}>Произошла ошибка при загрузке баннера</div>;
  }
};

export default Banner;
