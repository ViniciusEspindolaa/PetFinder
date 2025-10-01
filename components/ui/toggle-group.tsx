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
type ToggleGroupContextType = {
  value: string | string[] | undefined;
  type: 'single' | 'multiple';
  onItemPress: (itemValue: string) => void;
};

const ToggleGroupContext = createContext<ToggleGroupContextType | null>(null);

// --- Componente Raiz: ToggleGroup ---
type ToggleGroupProps = ViewProps & {
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  defaultValue?: string | string[];
};

function ToggleGroup({
  type = 'single',
  value: controlledValue,
  onValueChange,
  defaultValue,
  style,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleItemPress = (itemValue: string) => {
    let newValue: string | string[] | undefined;
    if (type === 'single') {
      newValue = value === itemValue ? undefined : itemValue;
    } else { // multiple
      const currentValue = (Array.isArray(value) ? value : []) as string[];
      newValue = currentValue.includes(itemValue)
        ? currentValue.filter((v) => v !== itemValue)
        : [...currentValue, itemValue];
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
  };

  const contextValue = { value, type, onItemPress: handleItemPress };

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <View style={[styles.container, style]} {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<{ style?: any }>(child)) {
            // Remove a borda direita do último item para um visual limpo
            const isLastChild = index === React.Children.count(children) - 1;
            return React.cloneElement(child, {
              style: [child.props.style, isLastChild && { borderRightWidth: 0 }]
            });
          }
          return child;
        })}
      </View>
    </ToggleGroupContext.Provider>
  );
}

// --- Componente do Item: ToggleGroupItem ---
type ToggleGroupItemProps = TouchableOpacityProps & {
  value: string;
};

function ToggleGroupItem({ value, style, children, ...props }: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error('ToggleGroupItem must be used within a ToggleGroup');
  }

  const { value: selectedValue, onItemPress } = context;
  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : selectedValue === value;

  // Renderiza texto com estilo apropriado se o filho for uma string
  const content = typeof children === 'string'
    ? <Text style={[styles.text, isSelected && styles.textActive]}>{children}</Text>
    : React.Children.map(children, child => {
        if(React.isValidElement(child)) {
            // Injeta a cor correta no ícone
            return React.cloneElement(child as React.ReactElement<{ color?: string }>, {
                color: isSelected ? COLORS.primaryForeground : COLORS.text
            })
        }
        return child;
    });

  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemActive, style]}
      onPress={() => onItemPress(value)}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  primaryForeground: '#FFFFFF',
  border: '#E2E8F0',
  background: '#FFFFFF',
  text: '#334155',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden', // Importante para os cantos arredondados
    alignSelf: 'flex-start',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
    borderRightWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemActive: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  textActive: {
    color: COLORS.primaryForeground,
  },
});

// --- Exportações ---
export { ToggleGroup, ToggleGroupItem };