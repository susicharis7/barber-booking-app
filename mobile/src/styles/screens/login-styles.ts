import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignSelf: "center",
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
  loginButton: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  registerRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  registerText: {
    color: colors.gray[500],
    fontSize: 14,
  },
  registerLink: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  socialSection: {
    marginTop: 20,
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    backgroundColor: colors.white,
  },
  socialButtonText: {
    color: colors.slate[950],
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[300],
  },
  dividerText: {
    marginHorizontal: 10,
    color: colors.gray[600],
    fontSize: 14,
  },
});
