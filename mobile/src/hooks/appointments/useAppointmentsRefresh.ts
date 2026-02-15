import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

type UseAppointmentsRefreshParams = {
  onFocus: () => Promise<void>;
  onInterval?: () => Promise<void>;
  intervalMs?: number;
};

export const useAppointmentsRefresh = ({
  onFocus,
  onInterval,
  intervalMs = 30000,
}: UseAppointmentsRefreshParams) => {
  useFocusEffect(
    React.useCallback(() => {
      void onFocus();

      const interval = setInterval(() => {
        if (onInterval) {
          void onInterval();
          return;
        }

        void onFocus();
      }, intervalMs);

      return () => clearInterval(interval);
    }, [onFocus, onInterval, intervalMs]),
  );
};
