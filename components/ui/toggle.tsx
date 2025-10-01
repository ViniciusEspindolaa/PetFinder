import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

// --- Tipos ---
type ToggleVariant = 'default' | 'outline';
type ToggleSize = 'default' | 'sm' | 'lg';

type ToggleProps = TouchableOpacityProps & {
  variant?: ToggleVariant;
  size?: ToggleSize;
  children: React.ReactNode;
  /** O estado de "pressionado" do botão. */
  pressed: boolean;
  /** Função chamada quando o botão é pressionado. */
  onPressedChange: (pressed: boolean) => void;
};

// --- Componente Principal: Toggle ---
const Toggle = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ToggleProps
>(
  (
    {
      variant = 'default',
      size = 'default',
      pressed,
      onPressedChange,
      children,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    // Monta os estilos do container e do texto com base nas props
    const containerStyle = [
      styles.container,
      variantStyles[variant].container,
      sizeStyles[size].container,
      pressed && activeStyles.container, // Estilo quando pressionado
      (disabled) && styles.containerDisabled,
      style,
    ];

    const textStyle = [
      styles.text,
      variantStyles[variant].text,
      sizeStyles[size].text,
      pressed && activeStyles.text, // Estilo do texto quando pressionado
    ];
    
    const iconColor = textStyle.filter((s): s is { color: string } => !!s && 'color' in s).find(s => 'color' in s)?.color as string;
    const iconSize = sizeStyles[size].iconSize;

    return (
      <TouchableOpacity
        ref={ref}
        style={containerStyle}
        disabled={disabled}
        onPress={() => onPressedChange(!pressed)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (typeof child === 'string' || typeof child === 'number') {
            return <Text style={textStyle}>{child}</Text>;
          }
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<{ size?: number; color?: string }>,
              {
                size: iconSize,
                color: iconColor,
              }
            );
          }
          return child;
        })}
      </TouchableOpacity>
    );
  }
);
Toggle.displayName = 'Toggle';

// --- Estilos ---
const COLORS = {
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
  accent: '#F1F5F9',
  accentForeground: '#1E293B',
  border: '#E2E8F0',
  text: '#334155',
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
const variantStyles = {
  default: {
    container: { backgroundColor: 'transparent' },
    text: { color: COLORS.text },
  },
  outline: {
    container: { borderWidth: 1, borderColor: COLORS.border },
    text: { color: COLORS.text },
  },
};

// Estilos de Tamanho
const sizeStyles = {
  default: {
    container: { height: 40, paddingHorizontal: 12 },
    text: { fontSize: 14 },
    iconSize: 16,
  },
  sm: {
    container: { height: 36, paddingHorizontal: 10 },
    text: { fontSize: 12 },
    iconSize: 14,
  },
  lg: {
    container: { height: 48, paddingHorizontal: 16 },
    text: { fontSize: 16 },
    iconSize: 18,
  },
};

// Estilos para o estado 'pressionado'
const activeStyles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.accent,
    },
    text: {
        color: COLORS.accentForeground,
    }
});


// --- Exportações ---
export { Toggle };