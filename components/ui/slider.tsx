import { Slider as RNSlider, SliderProps as RNSliderProps } from '@miblanchard/react-native-slider';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// --- Tipos ---
// Usamos as props da biblioteca subjacente para máxima flexibilidade
type SliderProps = RNSliderProps & {
  style?: StyleProp<ViewStyle>;
};

// --- Componente Principal: Slider ---
function Slider({ style, ...props }: SliderProps) {
  return (
    <View style={[styles.container, style]}>
      <RNSlider
        // Passa todas as props recebidas para o componente da biblioteca
        {...props}
        // Aplica nossos estilos customizados
        trackStyle={styles.track}
        minimumTrackStyle={styles.minimumTrack}
        thumbStyle={styles.thumb}
        thumbTouchSize={{ width: 40, height: 40 }} // Aumenta a área de toque do marcador
      />
    </View>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  muted: 'rgba(44, 62, 80, 0.2)',
  background: '#FFFFFF',
  border: '#2C3E50',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.muted,
  },
  minimumTrack: {
    backgroundColor: COLORS.primary,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primary,
    // Sombra para iOS e Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

// --- Exportações ---
export { Slider };