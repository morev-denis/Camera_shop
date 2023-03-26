export const URL_API = 'https://camera-shop.accelerator.pages.academy';

export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Promo = '/promo',
  Cameras = '/cameras',
  Reviews = '/reviews',
}

export const MAX_RATING = 5;

export const REVIEWS_COUNT = 3;

export const CONTENT_PER_PAGE = 9;

export const SIMILAR_CAMERAS_PER_PAGE = 3;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/page_:pageNumber',
  Cameras = '/cameras',
  Camera = '/cameras/:cameraId',
  Basket = '/basket',
}

export enum Tab {
  Description = 'Description',
  Specification = 'Specification',
}

export const RatingName: { [key: number]: string } = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

export const SortType = {
  Price: 'price',
  Rating: 'rating',
} as const;

export const OrderType = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const QueryParam = {
  Sort: '_sort',
  Order: '_order',
  Category: 'category',
  Type: 'type',
  Level: 'level',
  Limit: 'limit',
  MinPrice: 'price_gte',
  MaxPrice: 'price_lte',
} as const;
