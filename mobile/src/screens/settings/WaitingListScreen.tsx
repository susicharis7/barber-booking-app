import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/waitingList-styles';
import { api, isApiError } from '../../services/api';
import type { WaitingListItem } from '../../types';
import { formatDate } from '../../utils/calendar';
import { colors } from '../../styles/colors';

import { useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


const bgImage = require('../../../assets/images/waiting-list.png');

export default function WaitingListScreen({ navigation }: any) {
  const [waitingList, setWaitingList] = useState<WaitingListItem[]>([]);

  const loadWaitingList = async (silent = false) => {

    try {
      const res = await api.get<{ waitingList: WaitingListItem[] }>('/api/waiting-list');
      setWaitingList(res.waitingList || []);
    } catch (err: unknown) {
      if (isApiError(err)) {
        console.error('Fetch waiting list error: ', err.status);
        return;
      }
      console.error('Fetch waiting list error: ', err);
    } 
  };

  useFocusEffect(
    React.useCallback(() => {
      loadWaitingList();
    }, [])
  );


  const activeList = waitingList.filter((item) => item.status === 'active');
  const hasItems = activeList.length > 0;

  const handleCancel = async (id: number) => {
    try {
      await api.put(`/api/waiting-list/${id}/cancel`, {});
      await loadWaitingList();
    } catch (err: unknown) {
      if (isApiError(err)) {
        if (err.code === 'WAITING_LIST_NOT_FOUND') {
          await loadWaitingList();
          return;
        }
        console.error('Cancel waiting list error:', err.status, err.code, err.message);
        return;
      }
      console.error('Cancel waiting list error:', err);
    }

  };




    const goToServicesMain = () => {
    const parent = navigation.getParent();
    if (!parent) return;

    parent.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Services',
            state: {
              routes: [{ name: 'ServiceMain' }],
            },
          },
        ],
      })
    );
  };


  const goToSettingsMain = () => {
    const parent = navigation.getParent();
    if (!parent) return;

    parent.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Settings',
            state: {
              routes: [{ name: 'SettingsMain' }],
            },
          },
        ],
      })
    );
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={goToSettingsMain}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
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

            {activeList.map((item, index) => (
              <WaitingItem 
                key={item.id} 
                item={item} 
                position={index + 1} 
                onCancel={handleCancel}  
              />
            ))}

            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={22} color={colors.blue[500]} />
              <Text style={styles.infoText}>
                You'll receive a notification when a spot becomes available.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="list-outline" size={48} color={colors.slate[400]} />
            </View>
            <Text style={styles.emptyTitle}>No Waiting Requests</Text>
            <Text style={styles.emptyText}>
              When you join a waiting list for a fully booked time slot, it will appear here.
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={goToServicesMain}
              activeOpacity={0.7}
            >
              <Text style={styles.browseButtonText}>
                Browse Services
              </Text>
              <Ionicons name="arrow-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

/* Waiting Item Component */
function WaitingItem({ item, position, onCancel, }: { item: WaitingListItem; position: number; onCancel: (id: number) => void}) {
  const barberName = `${item.barber.first_name} ${item.barber.last_name}`;
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  const dateLabel = item.end_date
    ? `${formatDate(item.start_date, dateOptions)} - ${formatDate(item.end_date, dateOptions)}`
    : formatDate(item.start_date, dateOptions);

  return (
    <View style={styles.waitingCard}>
      <View style={styles.waitingHeader}>
        <View style={styles.positionBadge}>
          <Text style={styles.positionNumber}>#{position}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>In Queue</Text>
        </View>
      </View>

      <Text style={styles.serviceName}>{item.service?.name ?? '-'}</Text>

      <View style={styles.waitingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color={colors.slate[500]} />
          <Text style={styles.detailText}>{barberName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={colors.slate[500]} />
          <Text style={styles.detailText}>{dateLabel}</Text>
        </View>
      </View>

      <View style={styles.waitingActions}>
        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7} onPress={() => onCancel(item.id)}>
          <Ionicons name="close-circle-outline" size={18} color={colors.red[600]} />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
