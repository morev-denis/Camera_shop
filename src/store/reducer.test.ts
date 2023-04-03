import { reducer } from './reducer';

import { REVIEWS_COUNT } from '../const';

import {
  makeFakeCamera,
  makeFakeCameras,
  makeFakePromo,
  makeFakeSimilarCameras,
  makeFakeReviews,
} from '../utils/mocks';

import { InitialState } from '../types/initial-state';

const camera = makeFakeCamera();
const cameras = makeFakeCameras();
const promo = makeFakePromo();
const similarCameras = makeFakeSimilarCameras();
const reviews = makeFakeReviews();

const initialState: InitialState = {
  promo: null,
  cameras: null,
  camera: null,
  reviews: null,
  similarCameras: null,
  reviewsCount: REVIEWS_COUNT,
  queryParams: {
    _sort: '',
    _order: '',
  },
  minPrice: 0,
  maxPrice: 0,
  minPriceFiltered: 0,
  maxPriceFiltered: 0,
  basket: [
    { id: 1, count: 2 },
    { id: 2, count: 3 },
  ],
  discount: 0,
  isValidDiscount: false,
  isInvalidDiscount: false,
  couponValue: '',
};

const minPrice = 1000;
const maxPrice = 9990;

const minPriceFiltered = 1000;
const maxPriceFiltered = 9990;

describe('Reducer', () => {
  it('should update camera by load camera', () => {
    expect(reducer(initialState, { type: 'loadCamera', payload: camera })).toEqual({
      ...initialState,
      camera,
    });
  });

  it('should update cameras by load cameras', () => {
    expect(reducer(initialState, { type: 'loadCameras', payload: cameras })).toEqual({
      ...initialState,
      cameras,
    });
  });

  it('should update promo by load promo', () => {
    expect(reducer(initialState, { type: 'loadPromo', payload: promo })).toEqual({
      ...initialState,
      promo,
    });
  });

  it('should update similar cameras by load similar cameras', () => {
    expect(reducer(initialState, { type: 'loadSimilarCameras', payload: similarCameras })).toEqual({
      ...initialState,
      similarCameras,
    });
  });

  it('should update review by load reviews', () => {
    expect(reducer(initialState, { type: 'loadReviews', payload: reviews })).toEqual({
      ...initialState,
      reviews,
    });
  });

  it('should update cameras by load sorted cameras', () => {
    expect(reducer(initialState, { type: 'loadSortedCameras', payload: cameras })).toEqual({
      ...initialState,
      cameras,
    });
  });

  it('should get min price of cameras', () => {
    expect(reducer(initialState, { type: 'getMinPriceOfCameras', payload: minPrice })).toEqual({
      ...initialState,
      minPrice,
    });
  });

  it('should get max price of cameras', () => {
    expect(reducer(initialState, { type: 'getMaxPriceOfCameras', payload: maxPrice })).toEqual({
      ...initialState,
      maxPrice,
    });
  });

  it('should get min price of filtered cameras', () => {
    expect(
      reducer(initialState, { type: 'getMinPriceOfCamerasFiltered', payload: minPriceFiltered }),
    ).toEqual({
      ...initialState,
      minPriceFiltered,
    });
  });

  it('should get max price of filtered cameras', () => {
    expect(
      reducer(initialState, { type: 'getMaxPriceOfCamerasFiltered', payload: maxPriceFiltered }),
    ).toEqual({
      ...initialState,
      maxPriceFiltered,
    });
  });

  it('should set invalid discount to true', () => {
    expect(reducer(initialState, { type: 'setInvalidDiscount', payload: true })).toEqual({
      ...initialState,
      isInvalidDiscount: true,
    });
  });

  it('should set valid discount to true', () => {
    expect(reducer(initialState, { type: 'setValidDiscount', payload: true })).toEqual({
      ...initialState,
      isValidDiscount: true,
    });
  });

  it('should set couponValue to camera-333', () => {
    expect(reducer(initialState, { type: 'setCoupon', payload: 'camera-333' })).toEqual({
      ...initialState,
      couponValue: 'camera-333',
    });
  });

  it('should set discount to 15', () => {
    expect(reducer(initialState, { type: 'setDiscount', payload: 15 })).toEqual({
      ...initialState,
      discount: 15,
    });
  });

  it('should delete item', () => {
    expect(reducer(initialState, { type: 'deleteItem', payload: { id: 1, count: 2 } })).toEqual({
      ...initialState,
      basket: [{ id: 2, count: 3 }],
    });
  });
  it('should change basket item count', () => {
    expect(
      reducer(initialState, { type: 'changeBasketItemCount', payload: { id: 1, count: 3 } }),
    ).toEqual({
      ...initialState,
      basket: [
        { id: 1, count: 3 },
        { id: 2, count: 3 },
      ],
    });
  });

  it('should add camera to basket', () => {
    expect(
      reducer(initialState, { type: 'addCameraToBasket', payload: { id: 3, count: 1 } }),
    ).toEqual({
      ...initialState,
      basket: [
        { id: 1, count: 2 },
        { id: 2, count: 3 },
        { id: 3, count: 1 },
      ],
    });
  });
});
