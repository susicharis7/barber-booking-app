import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: colors.white,
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
    color: colors.gray[800],
  },

  logo: {
    width: 240,
    height: 180,
    alignSelf: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: colors.gray[50],
  },

  passwordRow: {
    flexDirection: 'row',
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  registerButton: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  registerButtonText: {
    color: colors.white,
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
    color: colors.gray[500],
    fontSize: 14,
  },

  footerLink: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
});
