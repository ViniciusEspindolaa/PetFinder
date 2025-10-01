import React, { useEffect } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// --- Tipos ---
type SkeletonProps = ViewProps;

// --- Componente Principal: Skeleton ---
function Skeleton({ style, ...props }: SkeletonProps) {
  // Cria um valor compartilhado para a opacidade, começando em 1 (totalmente visível)
  const opacity = useSharedValue(1);

  // Inicia a animação quando o componente é montado
  useEffect(() => {
    // Anima a opacidade para 0.5 e volta para 1, infinitamente
    opacity.value = withRepeat(
      withTiming(0.5, {
        duration: 1000, // Duração de cada "pulso"
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // -1 significa repetição infinita
      true // 'yoyo' effect: faz a animação ir e voltar
    );
  }, [opacity]);

  // Cria o estilo animado que será aplicado à View
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.base, style, animatedStyle]} {...props} />
  );
}

// --- Estilos ---
const COLORS = {
  accent: '#F1F5F9', // Cor base do skeleton
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.accent,
    borderRadius: 8, // Arredondamento padrão
  },
});

// --- Exportações ---
export { Skeleton };