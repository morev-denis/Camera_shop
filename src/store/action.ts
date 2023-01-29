import { createAction } from '@reduxjs/toolkit';
import { Cameras } from '../types/cameras';

import { Promo } from '../types/promo';

export const loadPromo = createAction('loadPromo', (value: Promo) => ({ payload: value }));

export const loadCameras = createAction('loadCameras', (value: Cameras) => ({ payload: value }));
