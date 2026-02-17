import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/service-styles';
import { colors } from '../../styles/colors';
import type { Barber } from '../../types';

type EmployeeListSectionProps = {
  barbers: Barber[];
  error: string | null;
  onRetry: () => void;
  onSelectBarber: (barber: Barber) => void;
};

export const EmployeeListSection = ({
  barbers,
  error,
  onRetry,
  onSelectBarber,
}: EmployeeListSectionProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>AVAILABLE BARBERS</Text>

      {error ? (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 8 }}>{error}</Text>
          <TouchableOpacity onPress={onRetry} activeOpacity={0.7}>
            <Text style={{ color: colors.primary, textAlign: 'center' }}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {barbers.map((barber) => (
        <TouchableOpacity
          key={barber.id}
          style={styles.employeeCard}
          activeOpacity={0.7}
          onPress={() => onSelectBarber(barber)}
        >
          <View style={styles.employeeAvatar}>
            {barber.avatar_url ? (
              <Image source={{ uri: barber.avatar_url }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={32} color={colors.white} />
            )}
          </View>

          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>
              {barber.first_name} {barber.last_name}
            </Text>
            <Text style={styles.employeeTitle}>{barber.title}</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color={colors.slate[400]} />
        </TouchableOpacity>
      ))}

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={22} color={colors.blue[500]} />
        <Text style={styles.infoText}>
          All our barbers are certified professionals with years of experience.
        </Text>
      </View>
    </ScrollView>
  );
};
