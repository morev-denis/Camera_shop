import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createApi } from '../services/api';

import { State } from '../types/store';

import {
  makeFakeCamera,
  makeFakeCameras,
  makeFakePromo,
  makeFakeSimilarCameras,
  makeFakeReviews,
  makeFakeReview,
} from '../utils/mocks';

import {
  fetchCamerasAction,
  fetchCameraAction,
  fetchPromoAction,
  fetchSimilarCamerasAction,
  fetchReviewsAction,
  postReviewAction,
  fetchCamerasMinPriceFiltered,
  fetchCamerasMaxPriceFiltered,
  postPromoAction,
  postOrderAction,
} from './api-actions';

import { APIRoute } from '../const';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Promo when GET /promo', async () => {
    const promo = makeFakePromo();

    mockApi.onGet(APIRoute.Promo).reply(200, promo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      'loadPromo',
      fetchPromoAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Cameras when GET /cameras', async () => {
    const cameras = makeFakeCameras();

    mockApi.onGet(APIRoute.Cameras).reply(200, cameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      'loadCameras',
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Camera when GET /cameras/1', async () => {
    const camera = makeFakeCamera();

    mockApi.onGet(`${APIRoute.Cameras}/1`).reply(200, camera);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      'loadCamera',
      fetchCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_SimilarCameras when GET /cameras/1/similar', async () => {
    const similarCameras = makeFakeSimilarCameras();

    mockApi.onGet(`${APIRoute.Cameras}/1/similar`).reply(200, similarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      'loadSimilarCameras',
      fetchSimilarCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Reviews when GET /cameras/1/reviews', async () => {
    const reviews = makeFakeReviews();

    mockApi.onGet(`${APIRoute.Cameras}/1/reviews`).reply(200, reviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      'loadReviews',
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should dispatch Post_Review when POST /reviews', async () => {
    const review = makeFakeReview();

    mockApi.onPost(APIRoute.Reviews).reply(200, review);

    const store = mockStore();

    await store.dispatch(postReviewAction(review));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      'postReview',
      postReviewAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchCamerasMinPriceFiltered when GET /cameras', async () => {
    const mockCamera = makeFakeCamera();
    mockApi.onGet(APIRoute.Cameras).reply(200, [mockCamera, mockCamera]);

    const store = mockStore();

    await store.dispatch(
      fetchCamerasMinPriceFiltered({
        params: {
          category: [''],
          type: [''],
          level: [''],
          minPrice: '',
          maxPrice: '',
        },
      }),
    );

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchCamerasMinPriceFiltered.pending.type,
      'loadCameras',
      'getMinPriceOfCamerasFiltered',
      fetchCamerasMinPriceFiltered.fulfilled.type,
    ]);
  });

  it('should dispatch fetchCamerasMaxPriceFiltered when GET /cameras', async () => {
    const mockCamera = makeFakeCamera();
    mockApi.onGet(APIRoute.Cameras).reply(200, [mockCamera, mockCamera]);

    const store = mockStore();

    await store.dispatch(
      fetchCamerasMaxPriceFiltered({
        params: {
          category: [''],
          type: [''],
          level: [''],
          minPrice: '',
          maxPrice: '',
        },
      }),
    );

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchCamerasMaxPriceFiltered.pending.type,
      'loadCameras',
      'getMaxPriceOfCamerasFiltered',
      fetchCamerasMaxPriceFiltered.fulfilled.type,
    ]);
  });

  it('should dispatch postPromoAction when POST /coupons', async () => {
    mockApi.onPost(APIRoute.Coupons).reply(200, Number);

    const store = mockStore();

    await store.dispatch(postPromoAction({ coupon: 'coupon-333' }));

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      postPromoAction.pending.type,
      'setCoupon',
      'setDiscount',
      'setInvalidDiscount',
      'setValidDiscount',
      postPromoAction.fulfilled.type,
    ]);
  });

  it('should dispatch postOrderAction when POST /orders', async () => {
    mockApi.onPost(APIRoute.Orders).reply(200);

    const store = mockStore();

    await store.dispatch(
      postOrderAction({
        camerasIds: [3, 5, 4],
        coupon: null,
      }),
    );

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([postOrderAction.pending.type, postOrderAction.fulfilled.type]);
  });
});
