// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  accent: '#18BC9C',
  background: '#FFFFFF',
  muted: '#ECF0F1',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  border: 'rgba(52, 73, 94, 0.1)',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Modal Principal ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // --- Header com Imagem ---
  imageContainer: {
    height: 250,
    width: '100%',
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: { position: 'absolute', top: 16, left: 16 },
  rewardBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: COLORS.secondary },

  // --- Conteúdo ---
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  petBreed: {
    fontSize: 16,
    color: COLORS.mutedText,
    paddingBottom: 2,
  },

  // --- Card de Informações ---
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    textTransform: 'capitalize',
  },

  // --- Linhas de Informação ---
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoRowTextContainer: {
    flex: 1,
  },

  // --- Botões de Ação ---
  buttonGroup: {
    gap: 12,
    paddingTop: 16,
  },
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
  primaryButton: { backgroundColor: COLORS.secondary },
  primaryButtonText: { color: COLORS.white },
  buttonGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  gridButton: {
    flex: 1,
    borderWidth: 1.5,
  },
  shareButton: { borderColor: COLORS.accent },
  shareButtonText: { color: COLORS.accent },
  reportButton: { borderColor: COLORS.mutedText },
  reportButtonText: { color: COLORS.mutedText },
  
  // --- Outros ---
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  helpBox: {
    backgroundColor: 'rgba(236, 240, 241, 0.5)',
    padding: 12,
    borderRadius: 8,
  },
  helpText: {
    fontSize: 12,
    color: 'rgba(52, 73, 94, 0.6)',
    textAlign: 'center',
  },

  // --- Modal de Contato ---
  contactModalContainer: {
    width: '85%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  contactModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '500',
  },
  contactPhone: {
    fontSize: 16,
    color: COLORS.mutedText,
  },
});