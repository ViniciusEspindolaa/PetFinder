// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  secondary: '#F39C12', // Laranja
  mutedText: '#7F8C8D',
};

const SPINNER_SIZE = 32;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200, // Garante uma altura mínima para centralização
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  spinnerWrapper: {
    width: SPINNER_SIZE,
    height: SPINNER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinningBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: SPINNER_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderTopColor: 'transparent', // Cria o efeito de "arco" que gira
  },
  heartIcon: {
    color: COLORS.secondary,
  },
  loadingText: {
    color: COLORS.mutedText,
    fontSize: 14,
  },
});