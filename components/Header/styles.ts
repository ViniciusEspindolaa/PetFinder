// styles.ts
import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  primary: '#2C3E50',
  secondary: '#F39C12', // Laranja
  destructive: '#E74C3C', // Vermelho
  background: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E0E0E0',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
  active: '#2980B9', // Azul para aba ativa
  activeText: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // --- Top Header ---
  topHeader: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 12 : 50, // Safe area para o topo
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  notificationButton: {
    padding: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.destructive,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.activeText,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // --- Popover de Notificações ---
  popoverBackdrop: {
    flex: 1,
  },
  popoverContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 60 : 100, // Ajuste a posição conforme necessário
    right: 16,
    width: 320,
    maxHeight: 400,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  popoverHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popoverHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  notificationItemUnread: {
    backgroundColor: 'rgba(41, 128, 185, 0.05)',
  },
  notificationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  notificationMessage: {
    color: COLORS.mutedText,
    fontSize: 14,
  },
  notificationMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
  emptyNotifications: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyNotificationsText: {
    marginTop: 8,
    color: COLORS.mutedText,
  },

  // --- Bottom Navigation ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    paddingBottom: Platform.OS === 'android' ? 0 : 20, // Safe area para baixo
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tabButtonActive: {
    // Estilo para aba ativa pode ser adicionado aqui, se necessário,
    // mas a cor do ícone/texto já muda
  },
  tabLabel: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
  tabLabelActive: {
    color: COLORS.active,
    fontWeight: 'bold',
  },
});