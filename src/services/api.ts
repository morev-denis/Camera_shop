import axios from 'axios';

import { URL_API, REQUEST_TIMEOUT } from '../const';

export const createApi = () => {
  const api = axios.create({ baseURL: URL_API, timeout: REQUEST_TIMEOUT });

  return api;
};
