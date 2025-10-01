// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  accent: '#18BC9C',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  background: '#FFFFFF',
  muted: '#ECF0F1',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  border: 'rgba(52, 73, 94, 0.2)',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Estado Inicial (Área de Upload) ---
  uploadContainer: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  previewCameraButton: {
        backgroundColor: COLORS.secondary, // Usando a cor secundária
    },
  uploadContent: {
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.mutedText,
    textAlign: 'center',
  },
  sizeInfo: {
    fontSize: 12,
    color: 'rgba(52, 73, 94, 0.4)',
  },
  loadingContainer: {
    padding: 48,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.mutedText,
  },

  // --- Estado com Foto Selecionada ---
  previewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(24, 188, 156, 0.2)',
  },
  previewContent: {
    padding: 16,
    gap: 12,
  },
  imageContainer: {
    height: 192,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.destructive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
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

  // --- Botões ---
  buttonGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cameraButton: {
    backgroundColor: COLORS.secondary,
  },
  cameraButtonText: {
    color: COLORS.white,
  },
  galleryButton: {
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  galleryButtonText: {
    color: COLORS.accent,
  },
});