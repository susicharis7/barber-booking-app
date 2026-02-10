import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
import { spacing } from '../../spacing';
import { typography } from '../../typography';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md + spacing.xs,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.sm + spacing.xs,
  },
  title: {
    ...typography.title,
    fontWeight: '700',
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.slate[200],
    gap: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  item: {
    fontSize: 15,
    color: colors.slate[700],
  },
  appointmentCard: {
    borderWidth: 1,
    borderColor: colors.slate[200],
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    gap: 4,
  },
  appointmentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.slate[950],
  },
  appointmentText: {
    fontSize: 14,
    color: colors.slate[600],
  },
  cancelButton: {
    marginTop: 8,
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
