// styles.ts
import { StyleSheet } from 'react-native';

// Definindo uma paleta de cores para reutilização
const COLORS = {
  primary: '#2980B9',     // Um azul para Adoção/Principal
  danger: '#C0392B',      // Vermelho para Perdido
  warning: '#F39C12',     // Laranja para Encontrado
  muted: '#7F8C8D',       // Cinza para o FAB aberto
  background: '#FFFFFF',
  textPrimary: '#2C3E50',
  textSecondary: '#FFFFFF',
  card: '#FFFFFF',
  border: '#BDC3C7',
};

export const styles = StyleSheet.create({
  // --- Containers Principais ---
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 30,
  },

  // --- Botão FAB Principal ---
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 40,
  },
  fabPrimary: {
    backgroundColor: COLORS.primary,
  },
  fabMuted: {
    backgroundColor: COLORS.muted,
  },

  // --- Menu de Opções ---
  menuContainer: {
    position: 'absolute',
    bottom: 80, // Distância acima do FAB principal
    right: 0,
    alignItems: 'flex-end',
    gap: 12,
    zIndex: 50,
  },
  menuOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelContainer: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  optionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra já está no labelContainer
  },
  optionButtonLost: { backgroundColor: COLORS.danger },
  optionButtonFound: { backgroundColor: COLORS.warning },
  optionButtonAdoption: { backgroundColor: COLORS.primary },

  // --- Modal de Formulário ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});