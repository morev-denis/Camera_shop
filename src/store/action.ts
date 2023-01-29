import { createAction } from '@reduxjs/toolkit';

import { Promo } from '../types/promo';

export const getPromo = createAction('getPromo', (value: Promo) => ({ payload: value }));
