import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  /* HERO */
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
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
  },

  headerSubtitle: {
    marginTop: 6,
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  /* TABS */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
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
    backgroundColor: '#0f172a',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },

  tabTextActive: {
    color: '#ffffff',
  },

  tabBadge: {
    backgroundColor: '#e2e8f0',
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
    color: '#64748b',
  },

  tabBadgeTextActive: {
    color: '#ffffff',
  },

  /* SECTION */
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#94a3b8',
    marginBottom: 16,
    marginLeft: 4,
  },

  /* APPOINTMENT CARD */
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#0f172a',
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
    color: '#0f172a',
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
    color: '#0f172a',
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
    color: '#64748b',
  },

  appointmentActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 14,
    gap: 12,
  },

  rescheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  rescheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },

  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },

  rebookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  rebookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  /* INFO CARD */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 32,
    gap: 12,
  },

  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
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
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },

  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});