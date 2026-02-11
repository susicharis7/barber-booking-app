import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
import { spacing } from '../../spacing';
import { typography } from '../../typography';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md + spacing.xs,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.md + spacing.xs,
    paddingBottom: spacing.xl + spacing.md,
    gap: spacing.md,
  },

  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
    gap: spacing.md,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: colors.alpha.white65,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    ...typography.title,
    color: colors.white,
    fontSize: 28,
    marginBottom: 4,
  },
  heroSubtitle: {
    color: colors.slate[300],
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 240,
  },
  heroIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.slate[900],
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[500],
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.slate[200],
    gap: spacing.sm,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.slate[500],
    marginBottom: spacing.xs,
  },

  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  overviewItem: {
    width: '48%',
    backgroundColor: colors.slate[50],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  overviewLabel: {
    color: colors.slate[500],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  overviewValue: {
    color: colors.slate[900],
    fontSize: 18,
    fontWeight: '800',
  },

  selectedDateRow: {
    marginTop: spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.xs,
  },
  selectedDateText: {
    flex: 1,
    color: colors.slate[800],
    fontSize: 14,
    fontWeight: '700',
  },
  selectedDateCountBadge: {
    borderRadius: 999,
    backgroundColor: colors.slate[100],
    borderWidth: 1,
    borderColor: colors.slate[200],
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  selectedDateCountText: {
    color: colors.slate[700],
    fontSize: 12,
    fontWeight: '700',
  },

  emptyDayCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.slate[200],
    backgroundColor: colors.slate[50],
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginTop: spacing.sm,
  },
  emptyDayTitle: {
    color: colors.slate[900],
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptyDayText: {
    color: colors.slate[600],
    fontSize: 13,
  },
  retryInlineButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: colors.primary,
  },
  retryInlineButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },

  appointmentCard: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.slate[200],
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.white,
    gap: 6,
  },
  appointmentRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.xs,
  },
  appointmentTimeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: colors.blue[100],
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  appointmentTimeText: {
    color: colors.blue[700],
    fontSize: 12,
    fontWeight: '700',
  },
  appointmentStatusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  appointmentStatusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  appointmentPrimaryText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.slate[950],
  },
  appointmentSecondaryText: {
    fontSize: 13,
    color: colors.slate[600],
  },
  appointmentFooterRow: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentFooterText: {
    fontSize: 12,
    color: colors.slate[500],
    fontWeight: '600',
  },
  appointmentExpanded: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.slate[200],
    gap: 8,
  },
  appointmentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentDetailText: {
    flex: 1,
    fontSize: 13,
    color: colors.slate[700],
  },
  appointmentNoteLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate[600],
    marginTop: 2,
  },
  appointmentNoteText: {
    fontSize: 13,
    color: colors.slate[700],
    lineHeight: 18,
  },

  cancelButton: {
    marginTop: spacing.xs,
    backgroundColor: colors.error,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cancelButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },

  errorText: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  listFooter: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.slate[400],
    fontWeight: '600',
  },
});
