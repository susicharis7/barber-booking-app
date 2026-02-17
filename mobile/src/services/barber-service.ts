import { api } from './api/client';
import type { Barber, WorkingHours } from '../types';

export const getBarbers = async () => {
  return api.get<{ barbers: Barber[] }>('/api/barbers', false);
};

export const getBarberWorkingHours = async (barberId: number) => {
  return api.get<{ workingHours: WorkingHours[] }>(`/api/barbers/${barberId}/working-hours`, false);
};
