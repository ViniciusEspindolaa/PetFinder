// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  border: '#E0E0E0',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContentContainer: {
    padding: 16,
    gap: 16, // Espaçamento entre as seções do cabeçalho
  },
  
  // --- Cabeçalho ---
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    color: COLORS.mutedText,
    marginTop: 4,
  },

  // --- Filtros Horizontais ---
  filtersScrollView: {
    marginHorizontal: -16, // Permite que o scroll vá até as bordas
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  filterButtonText: {
    fontWeight: '500',
    color: COLORS.mutedText,
  },
  activeFilterAll: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  activeFilterLost: { backgroundColor: COLORS.destructive, borderColor: COLORS.destructive },
  activeFilterFound: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  activeFilterText: { color: COLORS.white },

  // --- Lista Vazia ---
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    minHeight: 250,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.mutedText,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.mutedText,
    marginTop: 4,
  },

  // --- Separador de Itens ---
  separator: {
    height: 16, // Espaçamento entre os PetCards
  },
});