import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'danger';

type CardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: number;
  style?: ViewStyle;
};

const variantStyle: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: colors.white,
    borderWidth: 0,
  },
  elevated: {
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  danger: {
    backgroundColor: colors.red[50],
    borderWidth: 1,
    borderColor: colors.red[200],
  },
};

export const Card = ({ children, variant = 'default', padding = 16, style }: CardProps) => {
  return (
    <View
      style={[
        {
          borderRadius: 16,
          padding,
        },
        variantStyle[variant],
        style,
      ]}
    >
      {children}
    </View>
  );
};
