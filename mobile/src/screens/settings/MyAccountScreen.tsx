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
import { styles } from '../../styles/screens/myaccount-styles';
import { api } from '../../services/api';
import { logout } from '../../services/auth-service';

const bgImage = require('../../../assets/images/myAcc-bg.png');

export default function MyAccountScreen({ navigation }: any) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      // 1. Pozovi backend da obriše usera iz PostgreSQL i Firebase
      await api.delete('/api/users/me');

      // 2. Logout (očisti lokalni state)
      await logout();

      // Modal će se automatski zatvoriti jer će se app renderovati na Login screen
    } catch (error: any) {
      console.error('Delete account error:', error);
      Alert.alert('Error', error.message || 'Failed to delete account');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* TOP IMAGE (30%) */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={styles.backText}>Nazad</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroTitleWrap}>
          <Text style={styles.heroBadge}>ACCOUNT</Text>
          <Text style={styles.heroTitle}>Moj račun</Text>
        </View>
      </ImageBackground>

      {/* FADE TRANSITION */}
      <View style={styles.fade} />

      {/* BLACK CONTENT */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Ionicons name="lock-closed-outline" size={22} color="#000000" />
          <Text style={styles.itemText}>Pravila privatnosti</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={22} color="#000000" />
          <Text style={styles.itemText}>Uvjeti korištenja</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Ionicons name="information-circle-outline" size={22} color="#000000" />
          <Text style={styles.itemText}>O aplikaciji</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, styles.dangerItem]}
          activeOpacity={0.7}
          onPress={() => setShowDeleteModal(true)}
        >
          <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
          <Text style={[styles.itemText, styles.dangerText]}>
            Obriši moj račun
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
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
              <Ionicons name="warning" size={40} color="#ff4d4d" />
            </View>

            <Text style={styles.modalTitle}>Obriši račun?</Text>

            <Text style={styles.modalMessage}>
              Jeste li sigurni da želite obrisati svoj račun? Ova radnja je trajna i ne može se poništiti.
            </Text>

            <Text style={styles.modalWarning}>
              • Svi vaši podaci će biti trajno obrisani{'\n'}
              • Izgubićete historiju rezervacija{'\n'}
              • Nećete moći povratiti račun
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                <Text style={styles.cancelButtonText}>Odustani</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.deleteButtonText}>Obriši</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}