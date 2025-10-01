import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

export function HelloWave() {
  // 1. Cria um "valor compartilhado" para a rotação, começando em 0 graus.
  const rotation = useSharedValue(0);

  // 2. Define o estilo animado que será aplicado ao componente.
  //    Ele reage a qualquer mudança no valor de `rotation`.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // 3. Inicia a animação quando o componente é montado.
  useEffect(() => {
    rotation.value = withRepeat(
      // Define uma sequência de animações:
      withSequence(
        withTiming(25, { duration: 150 }), // Gira para 25 graus em 150ms
        withTiming(0, { duration: 150 })   // Retorna para 0 graus em 150ms
      ),
      4, // Repete a sequência 4 vezes
      true // Faz o movimento reverso (opcional, mas bom para acenos)
    );
  }, []);

  return (
    <Animated.Text style={[
      {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
      },
      animatedStyle, // Aplica o estilo animado
    ]}>
      👋
    </Animated.Text>
  );
}