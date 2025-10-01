import { Check } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

// --- Tipos ---
type CheckboxProps = TouchableOpacityProps & {
  /** O estado atual do checkbox (marcado ou não). */
  checked: boolean;
  /** Função chamada quando o estado do checkbox muda. */
  onCheckedChange: (checked: boolean) => void;
};

// --- Componente Principal: Checkbox ---
function Checkbox({
  checked,
  onCheckedChange,
  style,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.containerDisabled]}
      onPress={() => onCheckedChange(!checked)}
      disabled={disabled}
      {...props}
    >
      {/* O ícone de "check" só é renderizado se o estado for 'checked' */}
      {checked && <Check size={12} color={COLORS.primaryForeground} strokeWidth={3} />}
    </TouchableOpacity>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  primaryForeground: '#FFFFFF',
  border: '#CBD5E1',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  containerDisabled: {
    opacity: 0.5,
  },
});

// --- Exportações ---
export { Checkbox };