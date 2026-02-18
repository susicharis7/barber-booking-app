import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/privacyPolicy-styles';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/myAcc-bg.png');
type PrivacyPolicyScreenProps = NativeStackScreenProps<SettingsStackParamList, 'PrivacyPolicy'>;

export default function PrivacyPolicyScreen({ navigation }: PrivacyPolicyScreenProps) {
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
          <Text style={styles.headerBadge}>LEGAL</Text>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <Text style={styles.headerSubtitle}>How we collect, use and protect your data.</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>YOUR PRIVACY MATTERS</Text>

          <View style={styles.card}>
            <PolicySection
              icon="information-circle-outline"
              title="Information We Collect"
              text="We collect information you provide directly, such as your name, email address, phone number, and booking preferences when you create an account or make a reservation."
            />

            <PolicySection
              icon="shield-checkmark-outline"
              title="How We Use Your Data"
              text="Your information is used to provide and improve our services, process bookings, send appointment reminders, and communicate important updates about your account."
            />

            <PolicySection
              icon="lock-closed-outline"
              title="Data Protection"
              text="We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure."
            />

            <PolicySection
              icon="people-outline"
              title="Third-Party Sharing"
              text="We do not sell or share your personal information with third parties for marketing purposes. Data may only be shared with service providers who assist in app operations."
            />

            <PolicySection
              icon="trash-outline"
              title="Data Retention"
              text="Your data is retained as long as your account is active. You can request deletion of your account and associated data at any time through the app settings."
            />

            <PolicySection
              icon="finger-print-outline"
              title="Your Rights"
              text="You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time."
              isLast
            />
          </View>

          <View style={styles.contactCard}>
            <Ionicons name="mail-outline" size={22} color={colors.primary} />
            <View style={styles.contactTextWrap}>
              <Text style={styles.contactTitle}>Questions?</Text>
              <Text style={styles.contactText}>alagicuna5@gmail.com</Text>
            </View>
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
function PolicySection({
  icon,
  title,
  text,
  isLast = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.policySection, !isLast && styles.policySectionBorder]}>
      <View style={styles.policyHeader}>
        <View style={styles.policyIconContainer}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={styles.policyTitle}>{title}</Text>
      </View>
      <Text style={styles.policyText}>{text}</Text>
    </View>
  );
}
