// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  accent: '#2980B9',
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
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  headerCard: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  description: {
    fontSize: 14,
    color: COLORS.mutedText,
    marginTop: 4,
  },

  // --- Filtros ---
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  filterButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.mutedText,
  },
  activeFilterAll: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  activeFilterLost: { backgroundColor: COLORS.destructive, borderColor: COLORS.destructive },
  activeFilterFound: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  activeFilterText: { color: COLORS.white },

  // --- Mapa ---
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  selectedMarker: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    transform: [{ scale: 1.1 }],
  },
  markerText: {
    fontSize: 20,
  },

  // --- Card de Pet Selecionado ---
  selectedPetCard: {
    marginTop: 16,
    borderColor: 'rgba(44, 62, 80, 0.2)',
    backgroundColor: 'rgba(44, 62, 80, 0.05)',
  },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    overflow: 'hidden',
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
    gap: 16,
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  petInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.mutedText,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  flexButton: {
    flex: 1,
  },

  // --- Modal de Contato ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  contactPhone: {
    fontSize: 16,
    color: COLORS.mutedText,
  },
  
  // --- Seções Inferiores ---
  bottomSection: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});