import Card from '../card/card';

import { Cameras } from '../../types/cameras';

type Props = {
  cameras: Cameras;
};

const Cards = ({ cameras }: Props) => (
  <div className="cards catalog__cards" data-testid="catalog__cards">
    {cameras.map((camera) => (
      <Card key={camera.id} camera={camera} />
    ))}
  </div>
);

export default Cards;
