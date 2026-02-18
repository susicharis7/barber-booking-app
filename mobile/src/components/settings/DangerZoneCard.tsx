import React from 'react';
import { View } from 'react-native';
import { Button } from '../ui';

type DangerZoneCardProps = {
  onDeletePress: () => void;
};

export const DangerZoneCard = ({ onDeletePress }: DangerZoneCardProps) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Button
        label="Delete My Account"
        onPress={onDeletePress}
        variant="danger"
        leftIcon="trash-outline"
      />
    </View>
  );
};
