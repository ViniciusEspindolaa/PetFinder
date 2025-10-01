import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

// --- Tipos ---
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

type BadgeProps = TouchableOpacityProps & {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

// --- Componente Principal: Badge ---
function Badge({
  variant = 'default',
  children,
  style,
  onPress,
  ...props
}: BadgeProps) {
  // O componente base será um TouchableOpacity se tiver onPress, senão será uma View
  const Component = onPress ? TouchableOpacity : View;

  // Mapeia a variante para os estilos corretos
  const variantStyleMap = {
    default: {
      container: variantStyles.containerDefault,
      text: variantStyles.textDefault,
    },
    secondary: {
      container: variantStyles.containerSecondary,
      text: variantStyles.textSecondary,
    },
    destructive: {
      container: variantStyles.containerDestructive,
      text: variantStyles.textDestructive,
    },
    outline: {
      container: variantStyles.containerOutline,
      text: variantStyles.textOutline,
    },
  };

  const containerStyle = [
    styles.container,
    variantStyleMap[variant].container,
    style,
  ];
  const textStyle = [styles.text, variantStyleMap[variant].text];

  return (
    <Component style={containerStyle} onPress={onPress} {...props}>
      <Text style={textStyle}>{children}</Text>
    </Component>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  primaryForeground: '#FFFFFF',
  secondary: '#F39C12',
  secondaryForeground: '#FFFFFF',
  destructive: '#E74C3C',
  destructiveForeground: '#FFFFFF',
  outline: '#7F8C8D',
  border: '#E0E0E0',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99, // Para um formato de pílula
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start', // Garante que o badge não estique
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

// Estilos das variantes, separados para organização
const variantStyles = StyleSheet.create({
  // Default
  containerDefault: {
    backgroundColor: COLORS.primary,
    borderColor: 'transparent',
  },
  textDefault: {
    color: COLORS.primaryForeground,
  },
  // Secondary
  containerSecondary: {
    backgroundColor: COLORS.secondary,
    borderColor: 'transparent',
  },
  textSecondary: {
    color: COLORS.secondaryForeground,
  },
  // Destructive
  containerDestructive: {
    backgroundColor: COLORS.destructive,
    borderColor: 'transparent',
  },
  textDestructive: {
    color: COLORS.destructiveForeground,
  },
  // Outline
  containerOutline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.border,
  },
  textOutline: {
    color: COLORS.outline,
  },
});

// --- Exportações ---
export { Badge };