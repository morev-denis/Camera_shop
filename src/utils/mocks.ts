import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { name, datatype, internet, commerce } from 'faker';

import { Camera } from '../types/camera';
import { Cameras } from '../types/cameras';
import { Review } from '../types/review';
import { Reviews } from '../types/reviews';
import { Promo } from '../types/promo';

import { REVIEWS_COUNT } from '../const';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(1000),
  name: commerce.productName(),
  vendorCode: datatype.uuid(),
  type: commerce.productAdjective(),
  category: commerce.productAdjective(),
  description: commerce.productDescription(),
  level: datatype.string(10),
  rating: datatype.number(10),
  price: Number(commerce.price(100000)),
  previewImg: internet.url(),
  previewImg2x: internet.url(),
  previewImgWebp: internet.url(),
  previewImgWebp2x: internet.url(),
  reviewCount: datatype.number(100),
});

export const makeFakeCameras = (): Cameras =>
  Array.from({ length: 20 }, (element, i) => makeFakeCamera());

export const makeFakeSimilarCameras = (): Cameras =>
  Array.from({ length: 20 }, (element, i) => makeFakeCamera());

export const makeFakePromo = (): Promo => ({
  id: datatype.number(1000),
  name: commerce.productName(),
  previewImg: internet.url(),
  previewImg2x: internet.url(),
  previewImgWebp: internet.url(),
  previewImgWebp2x: internet.url(),
});

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  advantage: commerce.productDescription(),
  disadvantage: commerce.productDescription(),
  review: commerce.productDescription(),
  rating: datatype.number(5),
  createAt: datatype.string(),
  cameraId: datatype.number(1000),
});

export const makeFakeReviews = (): Reviews =>
  Array.from({ length: 20 }, (element, i) => makeFakeReview());

const middlewares = [thunk];

const promo = makeFakePromo();
const camera = makeFakeCamera();
const cameras = makeFakeCameras();
const reviews = makeFakeReviews();
const similarCameras = makeFakeSimilarCameras();

const mockStore = configureMockStore(middlewares);

export const store = mockStore({
  promo: promo,
  cameras: cameras,
  camera: camera,
  reviews: reviews,
  similarCameras: similarCameras,
  reviewsCount: REVIEWS_COUNT,
});
