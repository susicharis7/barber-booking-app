import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/servicesAndPriceList-styles';
import { colors } from '../../styles/colors';
import type { ServicesAndPriceList } from '../../types';
import { api } from '../../services/api';

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

  const [services, setServices] = useState<ServicesAndPriceList[]>([]);
  const [selectedService, setSelectedService] = useState<ServicesAndPriceList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.get<{ services: ServicesAndPriceList[] }>(
        '/api/servicesAndPriceListRoutes',
        false,
      );
      setServices(data.services);
    } catch (error) {
      console.error('Fetch Services & Price List error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <View style={{ paddingTop: 40 }}>
            <Text style={{ textAlign: 'center', color: colors.muted }}>Loading services...</Text>
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionLabel}>SELECT SERVICE</Text>

              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    selectedService?.id === service.id && styles.serviceCardSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedService(service)}
                >
                  <View style={styles.serviceHeader}>
                    <View
                      style={[
                        styles.radioButton,
                        selectedService?.id === service.id && styles.radioButtonSelected,
                      ]}
                    >
                      {selectedService?.id === service.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>

                    <View style={styles.serviceInfo}>
                      <Text
                        style={[
                          styles.serviceName,
                          selectedService?.id === service.id && styles.serviceNameSelected,
                        ]}
                      >
                        {service.name}
                      </Text>

                      {service.description && (
                        <Text style={styles.serviceDescription}>{service.description}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.serviceFooter}>
                    <View style={styles.durationContainer}>
                      <Ionicons name="time-outline" size={16} color={colors.muted} />
                      <Text style={styles.durationText}>{service.duration} min</Text>
                    </View>

                    <Text
                      style={[
                        styles.priceText,
                        selectedService?.id === service.id && styles.priceTextSelected,
                      ]}
                    >
                      {Number(service.price).toFixed(2)} BAM
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Reserve Btn */}
            <TouchableOpacity
              style={[
                styles.reserveButton,
                (!selectedService || loading) && styles.reserveButtonDisabled,
              ]}
              activeOpacity={0.7}
              onPress={handleContinue}
              disabled={!selectedService || loading}
            >
              <Text style={styles.reserveButtonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
