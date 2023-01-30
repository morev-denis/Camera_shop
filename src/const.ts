export const URL_API = 'https://camera-shop.accelerator.pages.academy';

export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Promo = '/promo',
  Cameras = '/cameras',
}

export const MAX_RATING = 5;

export const REVIEWS_COUNT = 3;

export const CONTENT_PER_PAGE = 9;

export enum AppRoute {
  Root = '/',
  Cameras = '/cameras',
  Camera = '/cameras/:cameraId',
}

export enum Tab {
  Description = 'Description',
  Specification = 'Specification',
}
