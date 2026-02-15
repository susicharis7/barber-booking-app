import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { isApiError } from '../../services/api';
import { cancelAppointment } from '../../services/appointments-service';

type UseCancelAppointmentParams = {
  refreshAll: () => Promise<void>;
};

type UseCancelAppointmentReturn = {
  cancelingId: number | null;
  handleCancel: (appointmentId: number) => Promise<void>;
};

export const useCancelAppointment = ({
  refreshAll,
}: UseCancelAppointmentParams): UseCancelAppointmentReturn => {
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const handleCancel = useCallback(
    async (appointmentId: number) => {
      setCancelingId(appointmentId);

      try {
        await cancelAppointment(appointmentId);
        await refreshAll();
        Alert.alert('Cancelled', 'Your appointment was cancelled.');
      } catch (err: unknown) {
        if (isApiError(err)) {
          Alert.alert('Error', err.message);
          return;
        }

        Alert.alert('Error', 'Unexpected error');
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
