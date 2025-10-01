// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  secondary: '#F39C12',
  accent: '#18BC9C',
  background: '#ECF0F1',
  white: '#FFFFFF',
  textPrimary: '#2C3E50',
  textSecondary: '#34495E',
  border: 'rgba(52, 73, 94, 0.2)',
};

export const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  mainContent: {
    gap: 24,
  },

  // --- Header/Logo ---
  headerContainer: {
    alignItems: 'center',
    gap: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoWrapper: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 24,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(52, 73, 94, 0.8)',
    textAlign: 'center',
    maxWidth: '90%',
  },

  // --- Card do Formulário ---
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(52, 73, 94, 0.7)',
    marginTop: 4,
  },

  // --- Inputs do Formulário ---
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  
  // --- Checkbox customizado ---
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(52, 73, 94, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(52, 73, 94, 0.8)',
  },

  // --- Botões ---
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: COLORS.secondary,
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  socialButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  socialButtonText: {
    color: COLORS.textSecondary,
  },
  appleButton: {
    backgroundColor: COLORS.primary,
  },
  appleButtonText: {
    color: COLORS.white,
  },
  
  // --- Separador "ou" ---
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  separatorText: {
    marginHorizontal: 12,
    color: 'rgba(52, 73, 94, 0.6)',
    textTransform: 'uppercase',
    fontSize: 12,
  },

  // --- Rodapé ---
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(52, 73, 94, 0.7)',
  },
  footerLink: {
    color: COLORS.accent,
    fontWeight: '500',
  },
});