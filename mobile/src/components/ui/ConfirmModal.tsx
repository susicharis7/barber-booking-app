import React from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles/colors';

type ConfirmTone = 'default' | 'danger' | 'success';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  tone?: ConfirmTone;
  onConfirm: () => void;
  onCancel: () => void;
};

const toneMap: Record<ConfirmTone, string> = {
  default: colors.primary,
  danger: colors.error,
  success: colors.green[500],
};

export const ConfirmModal = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  tone = 'default',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const accent = toneMap[tone];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.45)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: colors.white,
            borderRadius: 16,
            padding: 18,
          }}
        >
          <Text
            style={{ fontSize: 19, fontWeight: '800', color: colors.primary, marginBottom: 10 }}
          >
            {title}
          </Text>
          <Text
            style={{ color: colors.slate[600], fontSize: 14, lineHeight: 21, marginBottom: 16 }}
          >
            {message}
          </Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={onCancel}
              disabled={loading}
              style={{
                flex: 1,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.slate[300],
                paddingVertical: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.slate[700], fontWeight: '700' }}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={loading}
              style={{
                flex: 1,
                borderRadius: 12,
                backgroundColor: accent,
                paddingVertical: 12,
                alignItems: 'center',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={{ color: colors.white, fontWeight: '700' }}>{confirmLabel}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
