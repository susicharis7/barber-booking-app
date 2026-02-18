import React from 'react';
import { EmptyState } from '../ui';

type WaitingListEmptyStateProps = {
  onBrowseServices: () => void;
};

export const WaitingListEmptyState = ({ onBrowseServices }: WaitingListEmptyStateProps) => {
  return (
    <EmptyState
      icon="list-outline"
      title="No Waiting Requests"
      description="When you join a waiting list for a fully booked time slot, it will appear here."
      actionLabel="Browse Services"
      onAction={onBrowseServices}
    />
  );
};
