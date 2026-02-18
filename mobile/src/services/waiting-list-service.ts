import { WaitingListItem } from '@/types';
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

export const getWaitingList = async () => {
  return api.get<{ waitingList: WaitingListItem[] }>('/api/waiting-list');
};

export const cancelWaitingList = async (id: number) => {
  return api.put<{ waitingList: { id: number; status: 'cancelled' } }>(
    `/api/waiting-list/${id}/cancel`,
    {},
  );
};
