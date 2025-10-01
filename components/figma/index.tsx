// index.tsx
import { ImageOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ImageProps, View, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { styles } from './styles';

// Extendemos as props da Image do React Native
interface ImageWithFallbackProps extends ImageProps {
  // Você pode adicionar props customizadas aqui se necessário
}

export function ImageWithFallback({ style, ...rest }: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [didError, setDidError] = useState(false);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleError = () => {
    setIsLoading(false);
    setDidError(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
    // Inicia a animação de fade-in
    opacity.value = withTiming(1, { duration: 300 });
  };

  // Usamos Animated.Image para poder aplicar o estilo animado
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  return (
    <View style={[styles.container, style]}>
      {didError ? (
        // Estado de Erro
        <View style={styles.errorContainer}>
          <ImageOff size={32} color={styles.errorContainer.backgroundColor} />
        </View>
      ) : (
        // Estado de Carregamento/Sucesso
        <>
          <AnimatedImage
            style={[styles.image, animatedStyle]}
            onError={handleError}
            onLoadStart={() => setIsLoading(true)}
            onLoad={handleLoad}
            {...rest}
          />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#7F8C8D" />
            </View>
          )}
        </>
      )}
    </View>
  );
}