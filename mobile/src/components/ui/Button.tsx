import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
  testID?: string;
};

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.primary, text: colors.white },
  secondary: { bg: colors.slate[200], text: colors.primary },
  danger: { bg: colors.error, text: colors.white },
  ghost: { bg: 'transparent', text: colors.primary, border: colors.slate[300] },
};

const sizeStyles: Record<ButtonSize, { py: number; px: number; fontSize: number }> = {
  sm: { py: 10, px: 12, fontSize: 13 },
  md: { py: 14, px: 16, fontSize: 15 },
  lg: { py: 16, px: 18, fontSize: 16 },
};

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  testID,
}: ButtonProps) => {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      testID={testID}
      style={{
        backgroundColor: isDisabled ? colors.slate[300] : v.bg,
        borderWidth: v.border ? 1 : 0,
        borderColor: v.border,
        borderRadius: 12,
        paddingVertical: s.py,
        paddingHorizontal: s.px,
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled ? 0.8 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {leftIcon ? <Ionicons name={leftIcon} size={18} color={v.text} /> : null}
          <Text style={{ color: v.text, fontWeight: '700', fontSize: s.fontSize }}>{label}</Text>
          {rightIcon ? <Ionicons name={rightIcon} size={18} color={v.text} /> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};
