import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
};

export const EmptyState = ({
  title,
  description,
  icon = 'information-circle-outline',
  actionLabel,
  onAction,
  compact = false,
}: EmptyStateProps) => {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: compact ? 12 : 26 }}
    >
      <View
        style={{
          width: compact ? 56 : 68,
          height: compact ? 56 : 68,
          borderRadius: 999,
          backgroundColor: colors.slate[100],
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
        }}
      >
        <Ionicons name={icon} size={compact ? 26 : 32} color={colors.slate[400]} />
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 8 }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: colors.slate[600],
          textAlign: 'center',
          lineHeight: 21,
          maxWidth: 320,
          marginBottom: actionLabel ? 14 : 0,
        }}
      >
        {description}
      </Text>

      {actionLabel && onAction ? (
        <TouchableOpacity
          onPress={onAction}
          activeOpacity={0.75}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 16,
            paddingVertical: 11,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: colors.white, fontWeight: '700' }}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
