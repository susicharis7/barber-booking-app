import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  bg: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },

  heroSpacer: {
    height: 30,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  primaryButtonText: {
    color: colors.gray[900],
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '800',
  },

  section: {
    marginBottom: 34,
  },

  sectionKicker: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  locationText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1.6,
    marginTop: 20,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
    top: 20,
  },

  sectionTitle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 0.3,
    marginBottom: 18,
  },

  paragraph: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.75)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  contactWrap: {
    marginTop: 18,
    alignItems: 'center',
    gap: 18,
  },

  contactItem: {
    alignItems: 'center',
    gap: 10,
  },

  contactText: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.75)',
    fontSize: 16,
    fontWeight: '600',
  },

  socialItem: {
    alignItems: 'center',
    gap: 8,
  },

  socialText: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.65)',
    fontSize: 16,
    fontWeight: '600',
  },

  reviewCard: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 18,
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 14,
  },

  reviewText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.78)',
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 12,
  },

  reviewAuthor: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  daysRow: {
    paddingVertical: 10,
    paddingRight: 8,
    gap: 12,
  },

  dayChip: {
    minWidth: 120,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayChipLight: {
    backgroundColor: colors.white,
  },

  dayChipDark: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  dayChipDay: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
    letterSpacing: 0.8,
  },

  dayChipTime: {
    fontSize: 14,
    fontWeight: '700',
  },

  dayChipDayDarkText: {
    color: colors.gray[900],
  },

  dayChipDayLightText: {
    color: 'rgba(255,255,255,0.8)',
  },

  bottomSpacer: {
    height: 140,
  },
  logo: {
    width: 340,
    height: 340,
    alignSelf: 'center',
    marginBottom: 20,
  },

  /* Map */
  mapCard: {
    width: '100%',
    height: 260,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    top: 40,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  recenterButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  recenterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray[900],
  },
});
