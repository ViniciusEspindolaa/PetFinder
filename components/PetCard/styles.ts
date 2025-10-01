// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  accent: '#18BC9C',
  background: '#FFFFFF',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  border: '#E0E0E0',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Card Principal ---
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  // --- Imagem ---
  imageContainer: {
    height: 128,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  rewardBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.accent,
  },
  
  // --- Conteúdo ---
  content: {
    padding: 12,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  smallBadgesContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  outlineBadge: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outlineBadgeText: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.mutedText,
    lineHeight: 20,
  },

  // --- Ações ---
  contactInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  button: {
    flex: 1,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mapButton: { backgroundColor: COLORS.accent },
  mapButtonText: { color: COLORS.white },
  contactButton: { backgroundColor: COLORS.secondary },
  contactButtonText: { color: COLORS.white },
  
  // --- Modais ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalContent: {
    width: '95%',
    height: '80%',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
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