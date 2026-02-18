import React from 'react';
import { ConfirmModal } from '../ui';

type ConfirmActionModalProps = {
  visible: boolean;
  title: string;
  message: string;
  warning: string;
  confirmLabel: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmActionModal = ({
  visible,
  title,
  message,
  warning,
  confirmLabel,
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmActionModalProps) => {
  return (
    <ConfirmModal
      visible={visible}
      title={title}
      message={`${message}\n\n${warning}`}
      confirmLabel={confirmLabel}
      cancelLabel="Cancel"
      loading={loading}
      tone="danger"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
