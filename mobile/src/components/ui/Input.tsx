import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '../../styles/colors';

type InputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  helperText?: string;
  editable?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  autoComplete?: string;
  textContentType?: string;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: () => void;
};

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  editable = true,
  keyboardType = 'default',
  secureTextEntry = false,
  autoComplete,
  textContentType,
  multiline = false,
  numberOfLines,
  onFocus,
}: InputProps) => {
  const borderColor = error ? colors.error : colors.slate[200];

  return (
    <View style={{ marginBottom: 14 }}>
      {label ? (
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.muted, marginBottom: 8 }}>
          {label}
        </Text>
      ) : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete as never}
        textContentType={textContentType as never}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={onFocus}
        style={{
          backgroundColor: editable ? colors.white : colors.slate[100],
          borderWidth: 1,
          borderColor,
          borderRadius: 12,
          paddingVertical: multiline ? 12 : 11,
          paddingHorizontal: 12,
          color: colors.primary,
          fontSize: 14,
          textAlignVertical: multiline ? 'top' : 'center',
          minHeight: multiline ? 90 : undefined,
        }}
      />

      {error ? (
        <Text style={{ marginTop: 6, color: colors.error, fontSize: 12 }}>{error}</Text>
      ) : null}
      {!error && helperText ? (
        <Text style={{ marginTop: 6, color: colors.slate[500], fontSize: 12 }}>{helperText}</Text>
      ) : null}
    </View>
  );
};
