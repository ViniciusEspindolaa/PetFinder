import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  type ViewProps,
  type LayoutChangeEvent,
} from 'react-native';

// --- Tipos ---
type AspectRatioProps = ViewProps & {
  /** A proporção desejada, calculada como largura / altura. Padrão: 1 (quadrado). */
  ratio?: number;
  children: React.ReactNode;
};

// --- Componente Principal: AspectRatio ---
function AspectRatio({
  ratio = 1,
  children,
  style,
  ...props
}: AspectRatioProps) {
  const [calculatedHeight, setCalculatedHeight] = useState(0);

  // Esta função é chamada quando o layout da View é medido
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    // Garante que a largura seja maior que 0 para evitar divisões por zero
    // e atualiza a altura apenas se ela realmente mudar
    if (width > 0) {
      const newHeight = width / ratio;
      if (newHeight !== calculatedHeight) {
        setCalculatedHeight(newHeight);
      }
    }
  };

  return (
    <View
      onLayout={handleLayout}
      // O estilo é aplicado com a altura calculada
      style={[{ width: '100%', height: calculatedHeight }, style]}
      {...props}
    >
      {/* O conteúdo (children) é posicionado para preencher o container */}
      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  );
}

// --- Exportação ---
export { AspectRatio };