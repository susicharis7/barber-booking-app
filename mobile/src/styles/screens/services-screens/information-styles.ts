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

  /* DETAILS CARD */
  detailsCard: {
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

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 20,
  },

  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  detailInfo: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#0f172a',
  },

  priceLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },

  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },

  /* POLICY CARD */
  policyCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },

  policyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },

  policyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },

  policyText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },

  /* RESERVE BUTTON */
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 32,
    gap: 8,
  },

  reserveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },

  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },

  modalMessage: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },

  modalDetails: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },

  modalDetailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 4,
  },

  modalButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },

  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});