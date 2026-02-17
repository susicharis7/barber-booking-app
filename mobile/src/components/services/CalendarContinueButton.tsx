import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { colors } from '../../styles/colors';

type CalendarContinueButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

export const CalendarContinueButton = ({ disabled, onPress }: CalendarContinueButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.continueButton, disabled && styles.continueButtonDisabled]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.continueButtonText}>Continue</Text>
      <Ionicons name="arrow-forward" size={20} color={colors.white} />
    </TouchableOpacity>
  );
};
