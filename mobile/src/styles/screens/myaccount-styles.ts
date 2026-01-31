import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // iza hero slike
  },

  /* HERO IMAGE */
  hero: {
    height: height * 0.4, // vise hero slike
    width: '100%',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 18,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  heroTitleWrap: {
    position: 'absolute',
    left: 18,
    bottom: 22,
    alignItems: 'flex-start',
  },

  heroBadge: {
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

  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  /* TRANSITION (WHITE PANEL START) */
  fade: {
    height: 38,
    backgroundColor: '#F8F9FB',
    marginTop: -16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  /* WHITE CONTENT */
  content: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingTop: 0,
    gap: 14,
  },

  /* CARD */
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    // Android
    elevation: 3,
  },

  itemText: {
    flex: 1,
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },

  /* DANGER */
  dangerItem: {
    backgroundColor: '#FFF1F1',
  },

  dangerText: {
    color: '#E53935',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },

  modalIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },

  modalMessage: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },

  modalWarning: {
    fontSize: 13,
    color: '#ff4d4d',
    backgroundColor: '#fff5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    lineHeight: 20,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },

  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
