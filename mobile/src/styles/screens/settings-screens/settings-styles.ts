import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  headerImage: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
    zIndex: 2,
    marginBottom: -24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 14,
  },

  headerImageVisual: {
    width: '115%',
    transform: [{ translateX: -28 }],
  },

  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.45)',
    justifyContent: 'flex-end',
  },

  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 22,
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
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2},
    textShadowRadius: 6,
  },

  headerSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },

  headerDivider: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: -10,
    height: 3,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.22)',
    zIndex: 3,
  },
  
  headerSeparator: {
    marginTop: 8,
    top: 18,
    height: 2,
    borderRadius: 999, 
    backgroundColor: '#ffffff',
    opacity: 0.5,
    alignSelf: 'stretch',
    marginHorizontal: -20,
  },

  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -8,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },

  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#94a3b8',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef2ff',
  },

  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 14,
  },

  logoutItem: {
    backgroundColor: '#fff5f5',
  },

  logoutText: {
    color: '#dc2626',
  },

  logoutIconContainer: {
    backgroundColor: '#fee2e2',
  },
});
