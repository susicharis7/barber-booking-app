import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { styles } from '../../styles/screens/appointments-styles';

const bgImage = require('../../../assets/images/appoint-bg.png');

export const AppointmentsHeader = () => {
  return (
    <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
      <View style={styles.heroOverlay} />
      <View style={styles.headerContent}>
        <Text style={styles.headerBadge}>BOOKINGS</Text>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <Text style={styles.headerSubtitle}>Manage your upcoming and past bookings.</Text>
      </View>
    </ImageBackground>
  );
};
