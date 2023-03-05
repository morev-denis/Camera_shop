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
};

describe('Reducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should increase reviews count', () => {
    expect(reducer(initialState, { type: 'increaseReviewsCount' })).toEqual({
      ...initialState,
      reviewsCount: initialState.reviewsCount + REVIEWS_COUNT,
    });
  });

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
});
