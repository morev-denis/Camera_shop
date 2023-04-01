import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';
import { Camera } from '../types/camera';
import { Reviews } from '../types/reviews';

export type InitialState = {
  promo: Promo | null;
  cameras: Cameras | null;
  camera: Camera | null;
  reviews: Reviews | null;
  similarCameras: Cameras | null;
  reviewsCount: number;
  queryParams: {
    _sort: string;
    _order: string;
  };
  minPrice: number;
  maxPrice: number;
  minPriceFiltered: number;
  maxPriceFiltered: number;
  basket: { id: number; count: number }[];
};
