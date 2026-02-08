import { StyleSheet } from 'react-native';
import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 32,
    paddingTop: 48,
  },

  header: {
    marginTop: 6,
    marginBottom: 16,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  backText: {
    marginLeft: 4,
    color: colors.primary,
    fontWeight: '600',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.slate[200],
    marginBottom: 14,
    shadowColor: colors.primary,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  label: {
    fontSize: 13,
    color: colors.muted,
  },

  value: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },

  helperText: {
    fontSize: 12,
    color: colors.slate[500],
    marginBottom: 12,
  },

  windowCard: {
    backgroundColor: colors.slate[50],
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.slate[200],
    marginBottom: 16,
  },

  windowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  windowLabel: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 4,
  },

  windowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  pickHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate[200],
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  pickHintText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },

  windowDivider: {
    height: 1,
    backgroundColor: colors.slate[200],
    marginVertical: 12,
  },

  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.slate[100],
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
  },

  lockedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate[500],
  },

  calendarCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },

  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  calendarMonthYear: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },

  calendarWeekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  calendarWeekDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[400],
    width: 36,
    textAlign: 'center',
  },

  calendarGrid: {
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
    opacity: 0.35,
  },

  calendarDaySelected: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },

  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  calendarDayTextDisabled: {
    color: colors.slate[400],
  },

  calendarDayTextSelected: {
    color: colors.white,
  },

  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.blue[50],
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.blue[100],
    marginBottom: 16,
  },

  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate[700],
  },

  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  ctaButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  existsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  existsModalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.red[200],
    shadowColor: colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  existsIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.red[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    alignSelf: 'center',
  },

  existsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },

  existsText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.slate[700],
    textAlign: 'center',
  },

  existsHint: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate[500],
    textAlign: 'center',
  },

  existsButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },

  existsButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },

});
