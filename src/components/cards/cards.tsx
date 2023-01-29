import { useAppSelector } from '../../hooks/useAppSelector';

import Card from '../card/card';

const Cards = () => {
  const { cameras } = useAppSelector((state) => state);

  if (cameras) {
    return (
      <div className="cards catalog__cards">
        {cameras.map((camera) => (
          <Card key={camera.id} camera={camera} />
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
        Произошла ошибка при загрузке данных камер
      </div>
    );
  }
};

export default Cards;
