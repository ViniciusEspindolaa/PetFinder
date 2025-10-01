// styles.ts
import { Dimensions, StyleSheet } from 'react-native';

const COLORS = {
  primary: '#18BC9C',
  secondary: '#F39C12',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  background: '#FFFFFF',
  border: '#E0E0E0',
  white: '#FFFFFF',
};

const { width } = Dimensions.get('window');

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
    maxHeight: '85%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // --- Mapa ---
  mapContainer: {
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // --- Card de Informação da Localização ---
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(24, 188, 156, 0.2)',
    backgroundColor: 'rgba(24, 188, 156, 0.05)',
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  infoAddress: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
  infoCoords: {
    fontSize: 12,
    color: COLORS.mutedText,
    marginTop: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // --- Botões ---
  button: {
    paddingVertical: 12,
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
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  outlineButtonText: {
    color: COLORS.text,
  },
  currentLocationButton: {
    borderColor: COLORS.primary,
  },
  currentLocationButtonText: {
    color: COLORS.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  flexButton: {
    flex: 1,
  },
});