// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  accent: '#18BC9C',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  background: '#FFFFFF',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  border: 'rgba(52, 73, 94, 0.2)',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    paddingBottom: 20,
  },
  mapPickerLink: {
      color: COLORS.accent,
      textDecorationLine: 'underline',
      marginTop: 8,
      fontSize: 14,
    },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  cardHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardContent: {
    padding: 20,
    gap: 24,
  },

  // --- Seções e Inputs ---
  section: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
  },

  // --- Radio Group Customizado ---
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
  },
  radioLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // --- Picker/Select Customizado ---
  pickerButton: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
  },
  pickerPlaceholder: {
    color: COLORS.mutedText,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerModalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  pickerOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pickerOptionText: {
    fontSize: 18,
    textAlign: 'center',
  },

  // --- Botões Finais ---
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  outlineButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});