import { StyleSheet } from 'react-native';
import { colors } from '../../colors';

const heroTextShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 6,
};

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
    backgroundColor: 'rgba(255,255,255,0.18)',
    color: colors.white,
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 8,
    ...heroTextShadow,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    ...heroTextShadow,
  },

  headerSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    ...heroTextShadow,
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

  /* NOTIFICATION */
  notificationCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.white,
    marginBottom: 14,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  notificationRead: {
    backgroundColor: colors.slate[50],
  },

  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationTextWrap: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },

  notificationPreview: {
    fontSize: 14,
    color: colors.slate[600],
    lineHeight: 20,
  },

  readText: {
    color: colors.slate[400],
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 22,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: colors.primary,
  },

  modalText: {
    fontSize: 15,
    color: colors.slate[600],
    lineHeight: 22,
    marginBottom: 20,
  },

  modalButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  modalButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
});
