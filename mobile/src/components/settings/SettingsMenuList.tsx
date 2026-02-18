import React from 'react';
import { View } from 'react-native';
import { SettingsMenuItem } from './SettingsMenuItem';
import type { SettingsMenuItemProps } from './SettingsMenuItem';

type SettingsMenuListProps = {
  items: SettingsMenuItemProps[];
};

export const SettingsMenuList = ({ items }: SettingsMenuListProps) => {
  return (
    <View>
      {items.map((item) => (
        <SettingsMenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
          isDanger={item.isDanger}
        />
      ))}
    </View>
  );
};

export type { SettingsMenuItemProps };
