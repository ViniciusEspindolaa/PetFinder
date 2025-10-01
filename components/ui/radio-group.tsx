import React, { createContext, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type RadioGroupContextType = {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

// --- Componente Raiz: RadioGroup ---
type RadioGroupProps = ViewProps & {
  value?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
};

function RadioGroup({
  value: controlledValue,
  onValueChange,
  defaultValue,
  style,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Determina se o componente é controlado ou não
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
  };

  const contextValue = { value, onValueChange: handleValueChange };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View style={[styles.groupContainer, style]} {...props} />
    </RadioGroupContext.Provider>
  );
}
// --- Componente do Item: RadioGroupItem ---
type RadioGroupItemProps = TouchableOpacityProps & {
  value: string;
};

function RadioGroupItem({
  value,
  style,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        isSelected && styles.itemContainerSelected,
        disabled && styles.itemContainerDisabled,
        style,
      ]}
      onPress={() => onValueChange(value)}
      disabled={disabled}
      {...props}
    >
      {/* O indicador (círculo interno) só é renderizado se o item estiver selecionado */}
      {isSelected && <View style={styles.itemIndicator} />}
    </TouchableOpacity>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  border: '#CBD5E1',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  groupContainer: {
    gap: 12, // Espaçamento entre os itens do grupo
  },
  itemContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainerSelected: {
    borderColor: COLORS.primary,
  },
  itemContainerDisabled: {
    opacity: 0.5,
  },
  itemIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});

// --- Exportações ---
export { RadioGroup, RadioGroupItem };