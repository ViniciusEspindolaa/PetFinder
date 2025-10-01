import React, { useEffect } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// --- Tipos ---
type ProgressProps = ViewProps & {
  /** O valor do progresso, de 0 a 100. */
  value?: number;
};

// --- Componente Principal: Progress ---
function Progress({ style, value = 0, ...props }: ProgressProps) {
  // Garante que o valor esteja entre 0 e 100
  const clampedValue = Math.min(100, Math.max(0, value));
  
  // Cria um valor compartilhado para a animação
  const progress = useSharedValue(0);

  // Anima o valor do progresso sempre que a prop 'value' mudar
  useEffect(() => {
    progress.value = withTiming(clampedValue, { duration: 300 });
  }, [clampedValue, progress]);

  // Cria o estilo animado que muda a largura do indicador
  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
    </View>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'rgba(44, 62, 80, 0.2)', // Cor de fundo (primary/20)
  },
  indicator: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});

// --- Exportações ---
export { Progress };