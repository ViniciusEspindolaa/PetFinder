import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
} from 'react-native';

// --- Tipos ---
// Extendemos as props do TextInput e adicionamos uma prop customizada para erro
type InputProps = TextInputProps & {
  error?: boolean;
};

// --- Componente Principal: Input ---
const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, error, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    // Combina os estilos com base no estado do componente
    const inputStyle = [
      styles.base,
      isFocused && styles.focused,
      error && styles.error,
      // A prop 'editable' controla o estado desabilitado no React Native
      props.editable === false && styles.disabled,
      style,
    ];

    return (
      <TextInput
        ref={ref}
        style={inputStyle}
        // Passa a cor do placeholder via prop
        placeholderTextColor={COLORS.mutedForeground}
        // Gerencia o estado de foco
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e); // Chama o onFocus original, se existir
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e); // Chama o onBlur original, se existir
        }}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';


// --- Estilos ---
const COLORS = {
  text: '#111827',
  background: '#FFFFFF',
  border: '#CBD5E1',
  ring: '#18BC9C', // Verde/Azul para foco
  destructive: '#EF4444', // Vermelho para erro
  mutedForeground: '#94A3B8', // Cor do placeholder
};

const styles = StyleSheet.create({
  base: {
    height: 44,
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  focused: {
    borderColor: COLORS.ring,
    shadowColor: COLORS.ring,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  error: {
    borderColor: COLORS.destructive,
    shadowColor: COLORS.destructive,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#F8FAFC',
  },
});


// --- Exportações ---
export { Input };