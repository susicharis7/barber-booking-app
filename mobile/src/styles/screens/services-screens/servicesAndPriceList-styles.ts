import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  /* HERO */
  hero: {
    width: '100%',
    height: 240,
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
    fontSize: 28,
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
    paddingTop: 24,
    paddingHorizontal: 20,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#94a3b8',
    marginBottom: 16,
    marginLeft: 4,
  },

  /* SERVICE CARD */
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#f1f5f9',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  serviceCardSelected: {
    borderColor: '#0f172a',
    backgroundColor: '#f8fafc',
  },

  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },

  radioButtonSelected: {
    borderColor: '#0f172a',
  },

  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0f172a',
  },

  serviceInfo: {
    flex: 1,
  },

  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },

  serviceNameSelected: {
    color: '#0f172a',
  },

  serviceDescription: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },

  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginLeft: 38,
  },

  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  durationText: {
    fontSize: 14,
    color: '#64748b',
  },

  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  priceTextSelected: {
    color: '#0f172a',
  },

  /* RESERVE BUTTON */
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 32,
    gap: 8,
  },

  reserveButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },

  reserveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});