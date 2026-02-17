import { api } from './api/client';
import type { ServicesAndPriceList } from '@/types';

export const getServiceCatalog = async () => {
  return api.get<{ services: ServicesAndPriceList[] }>('/api/servicesAndPriceListRoutes', false);
};
