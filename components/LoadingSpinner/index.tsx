// index.tsx
import { Heart } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';

export function LoadingSpinner() {
  // --- Animação de Giro (Spin) ---
  const rotation = useSharedValue(0);
  const animatedSpinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // --- Animação de Pulso (Pulse) ---
  const scale = useSharedValue(1);
  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Inicia as animações quando o componente é montado
  useEffect(() => {
    // Animação de giro contínuo e linear
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1 // -1 significa repetição infinita
    );

    // Animação de pulso (escala aumenta e diminui)
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1
    );
  }, [rotation, scale]);

  return (
    <View style={styles.container}>
      <View style={styles.spinnerWrapper}>
        <Animated.View style={[styles.spinningBorder, animatedSpinStyle]} />
        <Animated.View style={animatedPulseStyle}>
          <Heart size={24} color={styles.heartIcon?.color || '#FF0000'} />
        </Animated.View>
      </View>
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}