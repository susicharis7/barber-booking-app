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

  /* New */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
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

  /* EMPLOYEE CARD */
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  employeeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  employeeInfo: {
    flex: 1,
    marginLeft: 16,
  },

  employeeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },

  employeeTitle: {
    fontSize: 14,
    color: '#64748b',
  },

  /* INFO CARD */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 32,
    gap: 12,
  },

  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});