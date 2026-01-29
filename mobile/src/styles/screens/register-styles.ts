import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#ffffff',
  },

  logoSection: {
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },

  formSection: {
    paddingTop: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },

  logo: {
    width: 240,
    height: 180,
    alignSelf: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },

  passwordRow: {
    flexDirection: 'row',
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  registerButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  registerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  footerLinkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },

  footerLink: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
});
