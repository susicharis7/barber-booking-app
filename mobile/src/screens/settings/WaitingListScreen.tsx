import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/waitingList-styles';
import { colors } from '../../styles/colors';
import { useFocusEffect, CommonActions, type NavigationProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, SettingsStackParamList } from '../../navigation/types';
import { useWaitingList } from '../../hooks/settings/useWaitingList';
import { WaitingListItemCard } from '../../components/settings/WaitingListItemCard';
import { WaitingListEmptyState } from '../../components/settings/WaitingListEmptyState';
import { LoadingBlock, EmptyState } from '../../components/ui';

const bgImage = require('../../../assets/images/waiting-list.png');
type WaitingListScreenProps = NativeStackScreenProps<SettingsStackParamList, 'WaitingList'>;

export default function WaitingListScreen({ navigation }: WaitingListScreenProps) {
  const { activeList, loading, error, load, cancelById } = useWaitingList();

  useFocusEffect(
    React.useCallback(() => {
      void load();
    }, [load]),
  );

  const handleCancel = async (id: number) => {
    const result = await cancelById(id);

    if (!result.ok) {
      Alert.alert('Cancel failed', result.message);
    }
  };

  const goToServicesMain = () => {
    const parent = navigation.getParent<NavigationProp<MainTabParamList>>();
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
      }),
    );
  };

  const goToSettingsMain = () => {
    const parent = navigation.getParent<NavigationProp<MainTabParamList>>();
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
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        <TouchableOpacity style={styles.backButton} onPress={goToSettingsMain} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>QUEUE</Text>
          <Text style={styles.headerTitle}>Waiting List</Text>
          <Text style={styles.headerSubtitle}>Track your position in the booking queue.</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        {loading ? (
          <LoadingBlock label="Loading waiting list..." />
        ) : error ? (
          <EmptyState
            icon="alert-circle-outline"
            title="Could not load waiting list"
            description={error}
            actionLabel="Retry"
            onAction={() => {
              void load();
            }}
            compact
          />
        ) : activeList.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>YOUR REQUESTS</Text>

            {activeList.map((item, index) => (
              <WaitingListItemCard
                key={item.id}
                item={item}
                position={index + 1}
                onCancel={handleCancel}
              />
            ))}

            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={22} color={colors.blue[500]} />
              <Text style={styles.infoText}>
                You&apos;ll receive a notification when a spot becomes available.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <WaitingListEmptyState onBrowseServices={goToServicesMain} />
        )}
      </View>
    </View>
  );
}
