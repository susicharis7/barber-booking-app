import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { colors } from '../../styles/colors';

const bgImage = require('../../../assets/images/settings-bg.png');

type CalendarHeroHeaderProps = {
  onBack: () => void;
};

export const CalendarHeroHeader = ({ onBack }: CalendarHeroHeaderProps) => {
  return (
    <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
      <View style={styles.heroOverlay} />

      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={22} color={colors.white} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.headerContent}>
        <Text style={styles.headerBadge}>SCHEDULE</Text>
        <Text style={styles.headerTitle}>Select Date & Time</Text>
        <Text style={styles.headerSubtitle}>Choose your preferred appointment slot.</Text>
      </View>
    </ImageBackground>
  );
};
