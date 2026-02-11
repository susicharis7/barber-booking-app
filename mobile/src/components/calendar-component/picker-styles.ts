import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  monthYear: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },

  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate[400],
    width: 40,
    textAlign: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },

  calendarDayDisabled: {
    opacity: 0.3,
  },

  calendarDaySelected: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },

  calendarDayText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },

  calendarDayTextDisabled: {
    color: colors.slate[300],
  },

  calendarDayTextSelected: {
    color: colors.white,
  },
});
