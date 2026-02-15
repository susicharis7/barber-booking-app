import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/termsOfUse-styles';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/myAcc-bg.png');
type TermsOfUseScreenProps = NativeStackScreenProps<SettingsStackParamList, 'TermsOfUse'>;

export default function TermsOfUse({ navigation }: TermsOfUseScreenProps) {
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
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>LEGAL</Text>
          <Text style={styles.headerTitle}>Terms of Use</Text>
          <Text style={styles.headerSubtitle}>Please read our terms and conditions carefully.</Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>AGREEMENT</Text>

          <View style={styles.card}>
            <TermSection
              number="1"
              title="General"
              text="By using the UNA BARBERINA mobile application, you agree to comply with these Terms of Use. If you do not agree with any part of the terms, please do not use the application."
            />

            <TermSection
              number="2"
              title="Services"
              text="The application allows users to view barber services, book appointments, and manage their reservations. We reserve the right to modify or discontinue services at any time."
            />

            <TermSection
              number="3"
              title="User Responsibilities"
              text="Users are responsible for providing accurate information and respecting scheduled appointments. Misuse of the application may result in restricted access."
            />

            <TermSection
              number="4"
              title="Privacy"
              text="Your personal data is handled in accordance with our Privacy Policy. We do not share personal information with third parties without consent."
            />

            <TermSection
              number="5"
              title="Liability"
              text="UNA BARBERINA is not responsible for any damages arising from the use or inability to use this application."
            />

            <TermSection
              number="6"
              title="Changes"
              text="These terms may be updated periodically. Continued use of the app implies acceptance of the updated terms."
              isLast
            />
          </View>

          <View style={styles.footerCard}>
            <Ionicons name="checkmark-circle" size={24} color={colors.green[500]} />
            <Text style={styles.footerText}>Last updated: January 2026</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* TERM SECTION COMPONENT */
function TermSection({
  number,
  title,
  text,
  isLast = false,
}: {
  number: string;
  title: string;
  text: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.termSection, !isLast && styles.termSectionBorder]}>
      <View style={styles.termHeader}>
        <View style={styles.termNumber}>
          <Text style={styles.termNumberText}>{number}</Text>
        </View>
        <Text style={styles.termTitle}>{title}</Text>
      </View>
      <Text style={styles.termText}>{text}</Text>
    </View>
  );
}
