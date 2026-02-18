import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/myaccount-styles';
import { colors } from '../../styles/colors';

type DangerZoneCardProps = {
  onDeletePress: () => void;
};

export const DangerZoneCard = ({ onDeletePress }: DangerZoneCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.item, styles.dangerItem]}
      activeOpacity={0.7}
      onPress={onDeletePress}
    >
      <View style={[styles.itemIconContainer, styles.dangerIconContainer]}>
        <Ionicons name="trash-outline" size={20} color={colors.error} />
      </View>
      <Text style={[styles.itemText, styles.dangerText]}>Delete My Account</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.error} />
    </TouchableOpacity>
  );
};
