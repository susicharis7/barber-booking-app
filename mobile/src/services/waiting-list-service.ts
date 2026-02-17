import { api } from './api/client';

export type CreateWaitingListPayload = {
  barber_id: number;
  service_id: number | null;
  start_date: string;
  end_date: string | null;
};

export const createWaitingList = async (payload: CreateWaitingListPayload) => {
  return api.post('/api/waiting-list', payload);
};
