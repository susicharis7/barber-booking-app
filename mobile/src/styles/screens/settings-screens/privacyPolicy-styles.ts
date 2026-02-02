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

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.slate[400],
    marginBottom: 12,
    marginLeft: 4,
  },

  /* CARD */
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  /* POLICY SECTION */
  policySection: {
    paddingVertical: 16,
  },

  policySectionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[100],
  },

  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  policyIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.blue[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  policyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
  },

  policyText: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    marginLeft: 48,
  },

  /* CONTACT CARD */
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
  },

  contactTextWrap: {
    flex: 1,
  },

  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
  },

  contactText: {
    fontSize: 14,
    color: colors.muted,
  },

  /* FOOTER CARD */
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green[100],
    borderRadius: 12,
    padding: 14,
    marginBottom: 32,
    gap: 8,
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.green[500],
  },
});