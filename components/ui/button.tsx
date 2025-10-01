import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

// --- Tipos ---
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = TouchableOpacityProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean; // Adicionamos uma prop de loading
};

// --- Componente Principal: Button ---
const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      children,
      style,
      disabled,
      isLoading,
      ...props
    },
    ref
  ) => {
    // Monta os estilos do container e do texto com base nas props
    const containerStyle = [
      styles.container,
      variantStyles[`${variant}Container`],
      sizeStyles[size].container,
      (disabled || isLoading) && styles.containerDisabled,
      style,
    ];

    const textStyle = [
      styles.text,
      variantStyles[`${variant}Text`],
      sizeStyles[size].text,
    ];

    const iconColor =
      (textStyle.find(s => typeof s === 'object' && s && 'color' in s)?.color as string) ||
      COLORS.primaryForeground;
    const iconSize = sizeStyles[size].iconSize;
    
    return (
      <TouchableOpacity
        ref={ref}
        style={containerStyle}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          React.Children.map(children, (child) => {
            // Se o filho for texto, aplica o estilo de texto do botão
            if (typeof child === 'string' || typeof child === 'number') {
              return <Text style={textStyle}>{child}</Text>;
            }
            // Se for um ícone (ou outro componente), injeta a cor e o tamanho corretos
            if (React.isValidElement(child)) {
              // Só injeta 'size' e 'color' se o componente aceitar essas props
              const propsToInject: any = {};
              if (child.props && typeof child.props === 'object' && 'size' in child.props) propsToInject.size = iconSize;
              if (child.props && typeof child.props === 'object' && 'color' in child.props) propsToInject.color = iconColor;
              return React.cloneElement(child as React.ReactElement, propsToInject);
            }
            return child;
          })
        )}
      </TouchableOpacity>
    );
  }
);
Button.displayName = 'Button';


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
  accent: '#ECF0F1',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  containerDisabled: {
    opacity: 0.5,
  },
});

// Estilos de Variantes
const variantStyles = StyleSheet.create({
  defaultContainer: { backgroundColor: COLORS.primary },
  defaultText: { color: COLORS.primaryForeground },
  destructiveContainer: { backgroundColor: COLORS.destructive },
  destructiveText: { color: COLORS.destructiveForeground },
  outlineContainer: { borderWidth: 1, borderColor: COLORS.border },
  outlineText: { color: COLORS.outline },
  secondaryContainer: { backgroundColor: COLORS.secondary },
  secondaryText: { color: COLORS.secondaryForeground },
  ghostContainer: { backgroundColor: 'transparent' },
  ghostText: { color: COLORS.primary },
  linkContainer: { backgroundColor: 'transparent' },
  linkText: { color: COLORS.primary, textDecorationLine: 'underline' },
});

// Estilos de Tamanho
const sizeStyles = {
  default: {
    container: { height: 40, paddingHorizontal: 16 },
    text: { fontSize: 14 },
    iconSize: 16,
  },
  sm: {
    container: { height: 36, paddingHorizontal: 12 },
    text: { fontSize: 12 },
    iconSize: 14,
  },
  lg: {
    container: { height: 48, paddingHorizontal: 24 },
    text: { fontSize: 16 },
    iconSize: 18,
  },
  icon: {
    container: { height: 40, width: 40, paddingHorizontal: 0 },
    text: {},
    iconSize: 20,
  },
};
export { Button };