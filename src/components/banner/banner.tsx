import { useAppSelector } from '../../hooks/useAppSelector';

const Banner = () => {
  const { promo } = useAppSelector((state) => state);

  if (promo) {
    return (
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x}`} />
          <img
            src={promo.previewImg}
            srcSet={promo.previewImg2x}
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
          <a className="btn" href="/">
            Подробнее
          </a>
        </p>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>Произошла ошибка при загрузке баннера</div>
    );
  }
};

export default Banner;
