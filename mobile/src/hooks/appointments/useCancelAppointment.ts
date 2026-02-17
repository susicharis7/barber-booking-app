import { useCallback, useState } from 'react';
import { isApiError } from '../../services/api/client';
import { cancelAppointment } from '../../services/appointments-service';

type UseCancelAppointmentParams = {
  refreshAll: () => Promise<void>;
};

export type CancelResult = { ok: true } | { ok: false; message: string };

type UseCancelAppointmentReturn = {
  cancelingId: number | null;
  handleCancel: (appointmentId: number) => Promise<CancelResult>;
};

export const useCancelAppointment = ({
  refreshAll,
}: UseCancelAppointmentParams): UseCancelAppointmentReturn => {
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const handleCancel = useCallback(
    async (appointmentId: number): Promise<CancelResult> => {
      setCancelingId(appointmentId);

      try {
        await cancelAppointment(appointmentId);
        await refreshAll();
        return { ok: true };
      } catch (err: unknown) {
        if (isApiError(err)) {
          return { ok: false, message: err.message };
        }

        return { ok: false, message: 'Unexpected error' };
      } finally {
        setCancelingId(null);
      }
    },
    [refreshAll],
  );

  return {
    cancelingId,
    handleCancel,
  };
};
