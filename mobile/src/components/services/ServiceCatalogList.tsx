import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/servicesAndPriceList-styles';
import { colors } from '../../styles/colors';
import type { ServicesAndPriceList } from '../../types';

type ServicesCatalogListProps = {
  services: ServicesAndPriceList[];
  selectedService: ServicesAndPriceList | null;
  error: string | null;
  onRetry: () => void;
  onSelectService: (service: ServicesAndPriceList) => void;
};

export const ServicesCatalogList = ({
  services,
  selectedService,
  error,
  onRetry,
  onSelectService,
}: ServicesCatalogListProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionLabel}>SELECT SERVICE</Text>

      {error ? (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 8 }}>{error}</Text>
          <TouchableOpacity onPress={onRetry} activeOpacity={0.7}>
            <Text style={{ color: colors.primary, textAlign: 'center' }}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceCard,
            selectedService?.id === service.id && styles.serviceCardSelected,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectService(service)}
        >
          <View style={styles.serviceHeader}>
            <View
              style={[
                styles.radioButton,
                selectedService?.id === service.id && styles.radioButtonSelected,
              ]}
            >
              {selectedService?.id === service.id ? <View style={styles.radioButtonInner} /> : null}
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

              {service.description ? (
                <Text style={styles.serviceDescription}>{service.description}</Text>
              ) : null}
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
  );
};
