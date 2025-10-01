import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

// --- Tipos ---
// Extendemos as props do Text e adicionamos uma prop para o estado desabilitado
type LabelProps = TextProps & {
  disabled?: boolean;
};

// --- Componente Principal: Label ---
function Label({ style, disabled, children, ...props }: LabelProps) {
  // Monta os estilos com base no estado do componente
  const labelStyle = [
    styles.base,
    disabled && styles.disabled, // Aplica o estilo 'disabled' se a prop for verdadeira
    style,
  ];

  return (
    <Text style={labelStyle} {...props}>
      {children}
    </Text>
  );
}

// --- Estilos ---
const COLORS = {
  text: '#374151', // Um cinza escuro para o texto do rótulo
};

const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 20,
  },
  disabled: {
    opacity: 0.5,
  },
});

// --- Exportações ---
export { Label };