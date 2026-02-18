import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/waitingList-styles';
import { colors } from '../../styles/colors';
import { formatDate } from '../../utils/calendar';
import type { WaitingListItem } from '../../types';
import { Button } from '../ui';

type WaitingListItemCardProps = {
  item: WaitingListItem;
  position: number;
  onCancel: (id: number) => void;
};

export const WaitingListItemCard = ({ item, position, onCancel }: WaitingListItemCardProps) => {
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
        <Button
          label="Cancel"
          onPress={() => onCancel(item.id)}
          variant="danger"
          size="sm"
          leftIcon="close-circle-outline"
        />
      </View>
    </View>
  );
};
