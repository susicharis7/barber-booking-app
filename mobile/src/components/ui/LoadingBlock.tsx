import React from 'react';
import { ActivityIndicator, Text, View, type ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';

type LoadingBlockProps = {
  label?: string;
  size?: 'small' | 'large';
  centered?: boolean;
  style?: ViewStyle;
};

export const LoadingBlock = ({
  label = 'Loading...',
  size = 'large',
  centered = true,
  style,
}: LoadingBlockProps) => {
  return (
    <View
      style={[
        {
          paddingVertical: 24,
          alignItems: centered ? 'center' : 'flex-start',
        },
        style,
      ]}
    >
      <ActivityIndicator size={size} color={colors.primary} />
      {label ? (
        <Text style={{ marginTop: 10, color: colors.muted, fontSize: 14, textAlign: 'center' }}>
          {label}
        </Text>
      ) : null}
    </View>
  );
};
