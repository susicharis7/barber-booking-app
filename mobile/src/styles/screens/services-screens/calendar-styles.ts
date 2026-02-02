import { StyleSheet } from 'react-native';
import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* HERO */
  hero: {
    width: '100%',
    height: 200,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.45)',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },

  backText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 4,
  },

  headerContent: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },

  headerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    color: colors.white,
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.white,
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.slate[400],
    marginBottom: 12,
    marginLeft: 4,
  },

  /* CALENDAR CARD */
  calendarCard: {
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

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  calendarMonthYear: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },

  calendarWeekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate[400],
    width: 40,
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

  /* TIME SLOTS */
  timeSlotsSection: {
    marginBottom: 20,
  },

  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.slate[100],
    borderWidth: 2,
    borderColor: colors.slate[100],
  },

  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  timeSlotTextSelected: {
    color: colors.white,
  },

  /* SUMMARY CARD */
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[100],
    gap: 10,
  },

  summaryLabel: {
    fontSize: 14,
    color: colors.muted,
    flex: 1,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'right',
    maxWidth: '50%',
  },

  summaryValuePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  noteSection: {
    marginTop: 16,
  },

  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.muted,
    marginBottom: 10,
  },

  noteInput: {
    backgroundColor: colors.slate[50],
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.slate[200],
    minHeight: 80,
    textAlignVertical: 'top',
  },

  /* CONTINUE BUTTON */
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 32,
    gap: 8,
  },

  continueButtonDisabled: {
    backgroundColor: colors.slate[300],
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});