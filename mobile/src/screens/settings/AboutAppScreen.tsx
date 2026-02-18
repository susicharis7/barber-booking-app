import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/aboutApp-styles';
import Constants from 'expo-constants';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/myAcc-bg.png');
type AboutAppScreenProps = NativeStackScreenProps<SettingsStackParamList, 'AboutApp'>;

export default function AboutAppScreen({ navigation }: AboutAppScreenProps) {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.warn('Failed to open link:', err));
  };

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>INFO</Text>
          <Text style={styles.headerTitle}>About App</Text>
          <Text style={styles.headerSubtitle}>App information, version and developer contact.</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>UNA BARBERINA</Text>
            <Text style={styles.cardText}>
              Modern booking aplikacija za barber studio. Brze rezervacije, pregled termina i
              direktan kontakt – sve na jednom mjestu.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Developer Contact</Text>

            <InfoItem
              icon="logo-whatsapp"
              label="WhatsApp"
              onPress={() => openLink('https://wa.me/38762625427')}
            />

            <InfoItem
              icon="logo-instagram"
              label="Instagram"
              onPress={() => openLink('https://instagram.com/haarke_')}
            />

            <InfoItem
              icon="logo-github"
              label="GitHub"
              onPress={() => openLink('https://github.com/susicharis7')}
            />

            <InfoItem
              icon="logo-linkedin"
              label="LinkedIn"
              onPress={() => openLink('https://www.linkedin.com/in/susicharis7')}
            />
          </View>
          <View style={[styles.card, styles.versionCard]}>
            <Text style={styles.versionText}>App Version</Text>
            <Text style={styles.versionNumber}>v{appVersion}</Text>
          </View>

          <Text style={styles.footerText}>Made with ❤️</Text>
        </ScrollView>
      </View>
    </View>
  );
}
function InfoItem({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.itemIconContainer}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
