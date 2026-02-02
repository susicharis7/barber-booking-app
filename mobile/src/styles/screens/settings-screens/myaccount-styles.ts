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
    color: colors.white,
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

  /* SECTION */
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.slate[400],
    marginBottom: 12,
    marginTop: 8,
    marginLeft: 4,
  },

  /* ITEM */
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: colors.white,
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue[50],
  },

  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 14,
  },

  /* DANGER */
  dangerItem: {
    backgroundColor: colors.red[50],
  },

  dangerIconContainer: {
    backgroundColor: colors.red[200],
  },

  dangerText: {
    color: colors.error,
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
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },

  modalIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.red[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },

  modalMessage: {
    fontSize: 15,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },

  modalWarning: {
    fontSize: 13,
    color: colors.error,
    backgroundColor: colors.red[100],
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    lineHeight: 20,
    width: '100%',
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.slate[100],
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },

  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.error,
    alignItems: 'center',
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});