import React from 'react';
import { Button } from '../ui';

type CalendarContinueButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

export const CalendarContinueButton = ({ disabled, onPress }: CalendarContinueButtonProps) => {
  return (
    <Button
      label="Continue"
      onPress={onPress}
      disabled={disabled}
      rightIcon="arrow-forward"
      variant="primary"
      size="lg"
    />
  );
};
