// styles.ts
import { StyleSheet } from 'react-native';

const COLORS = {
  muted: '#ECF0F1',
  mutedText: '#7F8C8D',
  border: '#E0E0E0',
};

export const styles = StyleSheet.create({
  // Container principal que define o tamanho do componente
  container: {
    backgroundColor: COLORS.muted,
    overflow: 'hidden', // Garante que a imagem não saia dos cantos arredondados
  },
  
  // Estilo da imagem para preencher o container
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  // Overlay para o estado de carregamento
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(236, 240, 241, 0.8)',
  },

  // Container para o estado de erro
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.muted,
  },
});