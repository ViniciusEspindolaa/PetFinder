// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  mutedText: '#7F8C8D',
  background: '#F8F9FA',
};

export const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContentContainer: {
    padding: 16,
    gap: 16, // Espaçamento entre o header, filtros e a lista
  },
  
  // --- Cabeçalho ---
  headerContainer: {
    alignItems: 'center',
    marginBottom: 8, // Espaço extra antes dos filtros
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