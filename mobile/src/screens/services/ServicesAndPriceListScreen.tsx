import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/servicesAndPriceList-styles';

const bgImage = require('../../../assets/images/settings-bg.png');

const services = [
  {
    id: 1,
    name: 'Šišanje',
    duration: 45,
    price: 25.00,
  },
  {
    id: 2,
    name: 'Uređivanje brade',
    duration: 30,
    price: 15.00,
  },
  {
    id: 3,
    name: 'Šišanje + Uređivanje Brade',
    duration: 60,
    price: 40.00,
  },
  {
    id: 4,
    name: 'VIP TRETMAN',
    description: 'Pranje kose, šišanje, uređivanje brade, čupanje dlačica voskom, masaža glave i lica',
    duration: 60,
    price: 55.00,
  },
  {
    id: 5,
    name: 'Dječije šišanje',
    description: 'Do 7 godina',
    duration: 30,
    price: 10.00,
  },
];

export default function ServicesAndPriceListScreen({ navigation, route }: any) {
  const { employee } = route.params;
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleContinue = () => {
    if (selectedService) {
      navigation.navigate('Calendar', {
        employee,
        service: selectedService,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>SERVICES</Text>
          <Text style={styles.headerTitle}>Services & Price List</Text>
          <Text style={styles.headerSubtitle}>
            with {employee.name}
          </Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
      <View style={styles.content}>
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
                <View style={[
                  styles.radioButton,
                  selectedService?.id === service.id && styles.radioButtonSelected,
                ]}>
                  {selectedService?.id === service.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={[
                    styles.serviceName,
                    selectedService?.id === service.id && styles.serviceNameSelected,
                  ]}>
                    {service.name}
                  </Text>
                  {service.description && (
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                  )}
                </View>
              </View>

              <View style={styles.serviceFooter}>
                <View style={styles.durationContainer}>
                  <Ionicons name="time-outline" size={16} color="#64748b" />
                  <Text style={styles.durationText}>{service.duration} min</Text>
                </View>
                <Text style={[
                  styles.priceText,
                  selectedService?.id === service.id && styles.priceTextSelected,
                ]}>
                  {service.price.toFixed(2)} BAM
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RESERVE BUTTON */}
        <TouchableOpacity
          style={[styles.reserveButton, !selectedService && styles.reserveButtonDisabled]}
          activeOpacity={0.7}
          onPress={handleContinue}
          disabled={!selectedService}
        >
          <Text style={styles.reserveButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}