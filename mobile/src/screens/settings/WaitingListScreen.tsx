import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/waitingList-styles';

const bgImage = require('../../../assets/images/waiting-list.png');

// Mock data - later make it fetch from Database
const mockWaitingList = [
  {
    id: 1,
    service: 'Haircut & Beard',
    barber: 'Alija Ramakic',
    requestedDate: '2026-02-15',
    position: 3,
    status: 'waiting',
  },
  {
    id: 2,
    service: 'Classic Haircut',
    barber: 'Alija Ramakic',
    requestedDate: '2026-02-10',
    position: 1,
    status: 'waiting',
  },
];

export default function WaitingListScreen({ navigation }: any) {
  const hasItems = mockWaitingList.length > 0;

  return (
    <View style={styles.container}>

      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>QUEUE</Text>
          <Text style={styles.headerTitle}>Waiting List</Text>
          <Text style={styles.headerSubtitle}>
            Track your position in the booking queue.
          </Text>
        </View>
      </ImageBackground>

      {/* White Content */}
      <View style={styles.content}>
        {hasItems ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>YOUR REQUESTS</Text>

            {mockWaitingList.map((item) => (
              <WaitingItem key={item.id} item={item} />
            ))}

            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={22} color="#3b82f6" />
              <Text style={styles.infoText}>
                You'll receive a notification when a spot becomes available.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="list-outline" size={48} color="#94a3b8" />
            </View>
            <Text style={styles.emptyTitle}>No Waiting Requests</Text>
            <Text style={styles.emptyText}>
              When you join a waiting list for a fully booked time slot, it will appear here.
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.7}
            >
              <Text style={styles.browseButtonText}>Browse Services</Text>
              <Ionicons name="arrow-forward" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

/* Waiting Item Component */
function WaitingItem({ item }: { item: typeof mockWaitingList[0] }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.waitingCard}>
      <View style={styles.waitingHeader}>
        <View style={styles.positionBadge}>
          <Text style={styles.positionNumber}>#{item.position}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>In Queue</Text>
        </View>
      </View>

      <Text style={styles.serviceName}>{item.service}</Text>

      <View style={styles.waitingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>{item.barber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>{formatDate(item.requestedDate)}</Text>
        </View>
      </View>

      <View style={styles.waitingActions}>
        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
          <Ionicons name="close-circle-outline" size={18} color="#dc2626" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}