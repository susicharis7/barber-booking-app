import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
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
    color: '#ffffff',
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
    color: '#ffffff',
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
    color: '#ffffff',
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    color: '#94a3b8',
    marginBottom: 12,
    marginLeft: 4,
  },

  /* CALENDAR CARD */
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#0f172a',
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
    color: '#0f172a',
  },

  calendarWeekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
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
    backgroundColor: '#0f172a',
    borderRadius: 12,
  },

  calendarDayText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },

  calendarDayTextDisabled: {
    color: '#cbd5e1',
  },

  calendarDayTextSelected: {
    color: '#ffffff',
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
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#f1f5f9',
  },

  timeSlotSelected: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },

  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },

  timeSlotTextSelected: {
    color: '#ffffff',
  },

  /* SUMMARY CARD */
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 10,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'right',
    maxWidth: '50%',
  },

  summaryValuePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  noteSection: {
    marginTop: 16,
  },

  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 10,
  },

  noteInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 80,
    textAlignVertical: 'top',
  },

  /* CONTINUE BUTTON */
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 32,
    gap: 8,
  },

  continueButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});