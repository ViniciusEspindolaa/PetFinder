import React from 'react';
import { ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';

// --- Tipos ---
// As props do nosso ScrollArea são as mesmas do ScrollView do React Native
type ScrollAreaProps = ScrollViewProps;

// --- Componente Principal: ScrollArea ---
function ScrollArea({ style, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollView
      style={[styles.container, style]}
      // Você pode controlar as barras de rolagem com estas props:
      showsVerticalScrollIndicator={true} // Padrão
      showsHorizontalScrollIndicator={false} // Padrão
      {...props}
    >
      {children}
    </ScrollView>
  );
}

// --- Estilos ---
// Geralmente, o ScrollArea não precisa de muitos estilos próprios,
// pois eles são passados pela prop 'style' e 'contentContainerStyle'
const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que a área de scroll ocupe o espaço disponível
  },
});

// --- Exportações ---
export { ScrollArea };