import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/notification-styles';
import { colors } from '../../styles/colors';

const bgImage = require('../../../assets/images/notif-bg.png');

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

export default function NotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New appointment available',
      message:
        'A new free slot is available today at 16:00. Book now before it’s taken.',
      read: false,
    },
    {
      id: '2',
      title: 'Appointment reminder',
      message:
        'Reminder: You have an appointment tomorrow at 11:00.',
      read: false,
    },
    {
      id: '3',
      title: 'Waiting list update',
      message:
        'You moved up on the waiting list. You are now position #2.',
      read: true,
    },
  ]);

  const [selected, setSelected] = useState<Notification | null>(null);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* BACK */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>UPDATES</Text>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            Stay informed about your bookings and updates.
          </Text>
        </View>
      </ImageBackground>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {notifications.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.notificationCard,
                item.read && styles.notificationRead,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                setSelected(item);
                markAsRead(item.id);
              }}
            >
              <View style={styles.notificationIcon}>
                <Ionicons
                  name={
                    item.read
                      ? 'notifications-outline'
                      : 'notifications'
                  }
                  size={20}
                  color={item.read ? colors.slate[400] : colors.primary}
                />
              </View>

              <View style={styles.notificationTextWrap}>
                <Text
                  style={[
                    styles.notificationTitle,
                    item.read && styles.readText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.notificationPreview,
                    item.read && styles.readText,
                  ]}
                  numberOfLines={2}
                >
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* MODAL */}
      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {selected?.title}
            </Text>
            <Text style={styles.modalText}>
              {selected?.message}
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSelected(null)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
