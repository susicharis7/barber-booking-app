import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/myaccount-styles';
import { api , isApiError } from '../../services/api';
import { logout } from '../../services/auth-service';
import { colors } from '../../styles/colors';

const bgImage = require('../../../assets/images/myAcc-bg.png');

export default function MyAccountScreen({ navigation }: any) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      await api.delete('/api/users/me');
      await logout();
    } catch (error: unknown) {
      if (isApiError(error)) {
        Alert.alert('Delete failed', error.message);
      } else {
        Alert.alert('Delete failed', 'Unexpected error');
      }
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
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
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>ACCOUNT</Text>
          <Text style={styles.headerTitle}>My Account</Text>
          <Text style={styles.headerSubtitle}>
            Privacy settings, terms of use and account management.
          </Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
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

        <TouchableOpacity
          style={[styles.item, styles.dangerItem]}
          activeOpacity={0.7}
          onPress={() => setShowDeleteModal(true)}
        >
          <View style={[styles.itemIconContainer, styles.dangerIconContainer]}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </View>
          <Text style={[styles.itemText, styles.dangerText]}>Delete My Account</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="warning" size={40} color={colors.error} />
            </View>

            <Text style={styles.modalTitle}>Delete Account?</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to delete your account? This action is permanent and cannot be undone.
            </Text>

            <Text style={styles.modalWarning}>
              • All your data will be permanently deleted{'\n'}
              • You will lose your booking history{'\n'}
              • You won't be able to recover your account
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.deleteButtonText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* MENU ITEM */
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
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.itemIconContainer}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
