import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { LoadingBlock } from '../../components/ui';
import { styles } from '../../styles/screens/services-screens/service-styles';
import { EmployeeListSection } from '../../components/services/EmployeeListSection';
import type { Barber } from '../../types';
import { useBarbers } from '../../hooks/services/useBarbers';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/settings-bg.png');
type ServiceScreenProps = NativeStackScreenProps<ServicesStackParamList, 'ServiceMain'>;

export default function ServiceScreen({ navigation }: ServiceScreenProps) {
  const { barbers, loading, error, refetch } = useBarbers();

  const handleSelectEmployee = (barber: Barber) => {
    navigation.navigate('ServicesAndPriceList', {
      employee: {
        id: barber.id,
        name: `${barber.first_name} ${barber.last_name}`,
        title: barber.title,
        avatar: barber.avatar_url,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>BOOKING</Text>
          <Text style={styles.headerTitle}>Choose Employee</Text>
          <Text style={styles.headerSubtitle}>Select your preferred barber to continue.</Text>
        </View>
      </ImageBackground>

      {/* CONTENT */}
      <View style={styles.content}>
        {loading ? (
          <LoadingBlock label="Loading barbers..." style={styles.loadingContainer} />
        ) : (
          <EmployeeListSection
            barbers={barbers}
            error={error}
            onRetry={() => void refetch()}
            onSelectBarber={handleSelectEmployee}
          />
        )}
      </View>
    </View>
  );
}
