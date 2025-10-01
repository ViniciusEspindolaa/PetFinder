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
};

export const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    padding: 16,
    gap: 24, // Espaçamento entre seções
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // --- Seção Hero ---
  heroContainer: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.mutedText,
  },

  // --- Card de Estatísticas ---
  statsSection: {
    alignItems: 'center',
    gap: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.25 }],
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    maxWidth: 350,
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.mutedText,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // --- Casos Recentes ---
  recentCasesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seeAllButtonText: {
    color: COLORS.accent,
    fontWeight: '500',
  },
  petCardsContainer: {
    gap: 12,
  },

  // --- Cards de Informação Genéricos ---
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoCardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoCardTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  infoCardContent: {
    padding: 16,
    gap: 16,
  },
  
  // --- "Como Funciona" ---
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.mutedText,
    marginTop: 2,
  },
  
  // --- Cards Temáticos (Localização, Sucesso) ---
  themedCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  themedCardTextContainer: {
    flex: 1,
    gap: 8,
  },
  themedCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  themedCardDescription: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
  locationButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  successBadgeText: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
});