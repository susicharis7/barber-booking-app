import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  hero: {
    width: '100%',
    height: 220,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.45)',
  },

  headerContent: {
    position: 'absolute',
    bottom: 40,
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
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
  },

  headerSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },

  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.slate[100],
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  tabActive: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.muted,
  },

  tabTextActive: {
    color: colors.white,
  },

  tabBadge: {
    backgroundColor: colors.slate[200],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  tabBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
  },

  tabBadgeTextActive: {
    color: colors.white,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.slate[400],
    marginBottom: 16,
    marginLeft: 4,
  },

  /* APPOINTMENT CARD */
  appointmentCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },

  appointmentDetails: {
    gap: 8,
    marginBottom: 16,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  detailText: {
    fontSize: 14,
    color: colors.muted,
  },

  appointmentActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.slate[100],
    paddingTop: 14,
    gap: 12,
  },

  rescheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate[100],
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  rescheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },


  rebookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  rebookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },

  /* INFO CARD */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue[100],
    borderRadius: 14,
    padding: 16,
    marginBottom: 32,
    gap: 12,
  },

  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.blue[700],
    lineHeight: 20,
  },

  /* EMPTY STATE */
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },

  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.slate[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },

  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
