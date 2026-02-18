import React from 'react';
import { EmptyState } from '../ui';

type TabType = 'upcoming' | 'past';

type AppointmentsEmptyStateProps = {
  activeTab: TabType;
  onPressBookNow: () => void;
};

export const AppointmentsEmptyState = ({
  activeTab,
  onPressBookNow,
}: AppointmentsEmptyStateProps) => {
  const isUpcoming = activeTab === 'upcoming';

  return (
    <EmptyState
      icon={isUpcoming ? 'calendar-outline' : 'time-outline'}
      title={isUpcoming ? 'No Upcoming Appointments' : 'No Past Appointments'}
      description={
        isUpcoming
          ? 'Book your next appointment and it will appear here.'
          : 'Your appointment history will appear here.'
      }
      actionLabel={isUpcoming ? 'Book Now' : undefined}
      onAction={isUpcoming ? onPressBookNow : undefined}
    />
  );
};
