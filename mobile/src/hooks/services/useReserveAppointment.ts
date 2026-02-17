import { useCallback, useState } from 'react';
import { isApiError } from '../../services/api/client';
import {
  createAppointment,
  type CreateAppointmentPayload,
} from '../../services/appointments-service';

type ReserveAppointmentResult = { ok: true } | { ok: false; status?: number; message: string };

type UseReserveAppointmentResult = {
  reserving: boolean;
  reserve: (payload: CreateAppointmentPayload) => Promise<ReserveAppointmentResult>;
};

export const useReserveAppointment = (): UseReserveAppointmentResult => {
  const [reserving, setReserving] = useState(false);

  const reserve = useCallback(
    async (payload: CreateAppointmentPayload): Promise<ReserveAppointmentResult> => {
      setReserving(true);

      try {
        await createAppointment(payload);
        return { ok: true };
      } catch (err: unknown) {
        if (isApiError(err)) {
          return { ok: false, status: err.status, message: err.message };
        }

        return { ok: false, message: 'Unexpected error' };
      } finally {
        setReserving(false);
      }
    },
    [],
  );

  return { reserving, reserve };
};
