import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/settings-styles';
import { colors } from '../../styles/colors';

export type SettingsMenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isDanger?: boolean;
};

export const SettingsMenuItem = ({
  icon,
  label,
  onPress,
  isDanger = false,
}: SettingsMenuItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isDanger && styles.logoutItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIconContainer, isDanger && styles.logoutIconContainer]}>
        <Ionicons name={icon} size={20} color={isDanger ? colors.error : colors.primary} />
      </View>
      <Text style={[styles.menuText, isDanger && styles.logoutText]}>{label}</Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={isDanger ? colors.error : colors.slate[400]}
      />
    </TouchableOpacity>
  );
};
