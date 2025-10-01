// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  accent: '#18BC9C',
  background: '#FFFFFF',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  border: '#E0E0E0',
};

export const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    gap: 12,
  },

  // --- Barra de Busca ---
  searchBarContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingLeft: 40,
    fontSize: 16,
    backgroundColor: COLORS.background,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
  },

  // --- Botão de Filtro (Collapsible Trigger) ---
  filterButton: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  activeFilterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },

  // --- Conteúdo dos Filtros ---
  filtersContent: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  clearButtonContainer: {
    alignItems: 'flex-end',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  clearButtonText: {
    color: COLORS.mutedText,
  },

  // --- Picker/Select Customizado ---
  pickerGroup: {
    gap: 8,
  },
  pickerLabel: {
    fontSize: 14,
    color: COLORS.mutedText,
    fontWeight: '500',
  },
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
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
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
});