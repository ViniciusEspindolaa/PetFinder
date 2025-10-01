import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  type PressableProps,
} from 'react-native';

// Usamos PressableProps para que o componente seja genérico e reutilizável
type HapticPressableProps = PressableProps;

export function HapticTab(props: HapticPressableProps) {
  
  const handlePressIn = (event: GestureResponderEvent) => {
    // Usamos Platform.OS para checar o sistema operacional
    if (Platform.OS === 'ios') {
      // Feedback de impacto 'Leve', ideal para interações de UI no iOS
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (Platform.OS === 'android') {
      // Feedback de 'Seleção', que é o padrão para toques em itens no Android
      Haptics.selectionAsync();
    }

    // Chamamos a função original onPressIn, caso ela tenha sido passada nas props
    props.onPressIn?.(event);
  };

  return (
    // Usamos o componente Pressable, que é a base para todos os toques no React Native
    <Pressable {...props} onPressIn={handlePressIn} />
  );
}