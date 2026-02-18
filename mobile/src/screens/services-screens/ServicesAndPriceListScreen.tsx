import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/servicesAndPriceList-styles';
import { colors } from '../../styles/colors';
import type { ServicesAndPriceList } from '../../types';
import { useServicesCatalog } from '../../hooks/services/useServicesCatalog';
import { ServicesCatalogList } from '../../components/services/ServiceCatalogList';
import { Button, LoadingBlock } from '../../components/ui';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/services-bg.png');

type ServicesAndPriceListScreenProps = NativeStackScreenProps<
  ServicesStackParamList,
  'ServicesAndPriceList'
>;

export default function ServicesAndPriceListScreen({
  navigation,
  route,
}: ServicesAndPriceListScreenProps) {
  const { employee } = route.params;
  const [selectedService, setSelectedService] = useState<ServicesAndPriceList | null>(null);
  const { services, loading, error, refetch } = useServicesCatalog();

  const handleContinue = () => {
    if (!selectedService) return;

    navigation.navigate('Calendar', {
      employee,
      service: selectedService,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Header Content */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>SERVICES</Text>
          <Text style={styles.headerTitle}>Services & Price List</Text>
          <Text style={styles.headerSubtitle}>with {employee.name}</Text>
        </View>
      </ImageBackground>

      {/* White Content */}
      <View style={styles.content}>
        {loading ? (
          <LoadingBlock label="Loading services..." />
        ) : (
          <>
            <ServicesCatalogList
              services={services}
              selectedService={selectedService}
              error={error}
              onRetry={() => void refetch()}
              onSelectService={setSelectedService}
            />

            {/* Reserve Btn */}
            <Button
              label="Continue"
              onPress={handleContinue}
              disabled={!selectedService || loading}
              rightIcon="arrow-forward"
              variant="primary"
              size="lg"
            />
          </>
        )}
      </View>
    </View>
  );
}
