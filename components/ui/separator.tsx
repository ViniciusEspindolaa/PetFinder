import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

// --- Tipos ---
type SeparatorProps = ViewProps & {
  /** A orientação do separador. Padrão: 'horizontal'. */
  orientation?: 'horizontal' | 'vertical';
};

// --- Componente Principal: Separator ---
function Separator({
  orientation = 'horizontal',
  style,
  ...props
}: SeparatorProps) {
  // Monta os estilos com base na orientação
  const separatorStyle = [
    styles.base,
    orientation === 'horizontal' ? styles.horizontal : styles.vertical,
    style,
  ];

  return <View style={separatorStyle} {...props} />;
}

// --- Estilos ---
const COLORS = {
  border: '#E2E8F0', // Um cinza claro para a borda/separador
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.border,
    // shrink: 0 (da web) é o comportamento padrão no React Native
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});

// --- Exportações ---
export { Separator };