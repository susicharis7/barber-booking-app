import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/myaccount-styles';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';
import { useDeleteAccount } from '../../hooks/settings/useDeleteAccount';
import { ConfirmActionModal } from '../../components/settings/ConfirmActionModal';
import { DangerZoneCard } from '../../components/settings/DangerZoneCard';

const bgImage = require('../../../assets/images/myAcc-bg.png');
type MyAccountScreenProps = NativeStackScreenProps<SettingsStackParamList, 'MyAccount'>;

export default function MyAccountScreen({ navigation }: MyAccountScreenProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleting, deleteAccount } = useDeleteAccount();

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();

    if (!result.ok) {
      Alert.alert('Delete failed', result.message);
    }

    setShowDeleteModal(false);
  };

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
          <Text style={styles.headerBadge}>ACCOUNT</Text>
          <Text style={styles.headerTitle}>My Account</Text>
          <Text style={styles.headerSubtitle}>
            Privacy settings, terms of use and account management.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>SETTINGS</Text>

        <MenuItem
          icon="lock-closed-outline"
          label="Privacy Policy"
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />

        <MenuItem
          icon="document-text-outline"
          label="Terms of Use"
          onPress={() => navigation.navigate('TermsOfUse')}
        />

        <MenuItem
          icon="information-circle-outline"
          label="About App"
          onPress={() => navigation.navigate('AboutApp')}
        />

        <Text style={styles.sectionTitle}>DANGER ZONE</Text>
        <DangerZoneCard onDeletePress={() => setShowDeleteModal(true)} />
      </View>

      <ConfirmActionModal
        visible={showDeleteModal}
        title="Delete Account?"
        message="Are you sure you want to delete your account? This action is permanent and cannot be undone."
        warning={
          "- All your data will be permanently deleted\n- You will lose your booking history\n- You won't be able to recover your account"
        }
        confirmLabel="Delete"
        loading={deleting}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </View>
  );
}

function MenuItem({
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
