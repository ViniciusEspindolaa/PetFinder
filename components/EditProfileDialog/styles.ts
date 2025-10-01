// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#18BC9C',   // Verde
  secondary: '#F39C12', // Laranja
  darkBlue: '#2C3E50',
  midBlue: '#34495E',
  lightGray: '#ECF0F1',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Estrutura do Modal ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  // --- Header ---
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  description: {
    fontSize: 14,
    color: `${COLORS.midBlue}B3`, // 70% de opacidade
    marginTop: 4,
  },

  // --- Seção da Foto ---
  profilePicSection: {
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicText: {
    fontSize: 12,
    color: `${COLORS.midBlue}99`, // 60% de opacidade
    textAlign: 'center',
  },

  // --- Seções do Formulário ---
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkBlue,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.midBlue}33`, // 20% de opacidade
    paddingBottom: 8,
    marginBottom: 16,
  },

  // --- Inputs ---
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.midBlue,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 44,
    borderWidth: 2,
    borderColor: `${COLORS.midBlue}33`,
    borderRadius: 6,
    paddingRight: 40, // Espaço para ícone à direita (senha)
    paddingLeft: 40,  // Espaço para ícone à esquerda
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top', // Para alinhar o texto no topo no Android
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },

  // --- Botões de Ação ---
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.midBlue}33`,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: `${COLORS.midBlue}33`,
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: COLORS.midBlue,
  },
  submitButtonText: {
    color: COLORS.white,
  },
});