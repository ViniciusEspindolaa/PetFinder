import { Check, ChevronDown } from 'lucide-react-native';
import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type SelectContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string | undefined;
  setSelectedValue: (value: string) => void;
  options: Map<string, React.ReactNode>;
  registerOption: (value: string, children: React.ReactNode) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

// --- Componente Raiz: Select ---
type SelectProps = {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

function Select({ children, value: controlledValue, onValueChange, defaultValue }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [triggerLayout, setTriggerLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const triggerRef = useRef<View>(null);
  
  // Mapa para guardar os labels das opções
  const options = useRef(new Map<string, React.ReactNode>()).current;
  const registerOption = (value: string, children: React.ReactNode) => {
    options.set(value, children);
  };

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;
  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
  };

  const contextValue = { isOpen, setIsOpen, selectedValue, setSelectedValue: handleValueChange, options, registerOption };

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectContent
  );

  const handleTriggerPress = () => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setTriggerLayout({ x: pageX, y: pageY, width, height });
      setIsOpen(true);
    });
  };

  return (
    <SelectContext.Provider value={contextValue}>
      {trigger && React.cloneElement(trigger as React.ReactElement<{ ref: React.Ref<View>; onPress?: () => void }>, { ref: triggerRef, onPress: handleTriggerPress })}
      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={() => setIsOpen(false)}>
        {content && triggerLayout && React.cloneElement(content as React.ReactElement<{ triggerLayout: any }>, { triggerLayout })}
      </Modal>
    </SelectContext.Provider>
  );
}

// --- Gatilho: SelectTrigger ---
const SelectTrigger = React.forwardRef<View, { children: React.ReactNode; onPress?: () => void }>(
  ({ children, ...props }, ref) => {
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { ...props, ref });
    }
    return child;
  }
);
SelectTrigger.displayName = "SelectTrigger";

// --- Valor Exibido: SelectValue ---
function SelectValue({ placeholder }: { placeholder?: string }) {
    const context = useContext(SelectContext);
    if (!context) throw new Error('SelectValue must be used within a Select');

    const { selectedValue, options } = context;
    const content = selectedValue ? options.get(selectedValue) : placeholder;

    return <Text style={[styles.triggerText, !selectedValue && styles.placeholderText]}>{content}</Text>;
}

// --- Conteúdo Flutuante: SelectContent ---
function SelectContent({ children, style, triggerLayout }: { children: React.ReactNode; style?: ViewProps['style'], triggerLayout: any }) {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectContent must be used within a Select');

  return (
    <Pressable style={styles.overlay} onPress={() => context.setIsOpen(false)}>
      <Pressable style={[styles.contentContainer, { top: triggerLayout.y + triggerLayout.height + 4, width: triggerLayout.width, left: triggerLayout.x }, style]}>
        <ScrollView>{children}</ScrollView>
      </Pressable>
    </Pressable>
  );
}

// --- Item da Lista: SelectItem ---
function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within a Select');

  const { selectedValue, setSelectedValue, setIsOpen, registerOption } = context;
  const isSelected = selectedValue === value;

  // Registra a opção no mapa para que o SelectTrigger possa exibir o label
  React.useEffect(() => {
    registerOption(value, children);
  }, [children, value, registerOption]);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedValue(value);
        setIsOpen(false);
      }}
    >
      <Text style={styles.itemText}>{children}</Text>
      {isSelected && <Check size={16} color={COLORS.primary} />}
    </TouchableOpacity>
  );
}

// --- Componentes de Layout ---
function SelectLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}
function SelectSeparator() {
  return <View style={styles.separator} />;
}


// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  popover: '#FFFFFF',
  text: '#111827',
  mutedForeground: '#9CA3AF',
  border: '#E2E8F0',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  trigger: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },
  triggerText: {
    fontSize: 16,
    color: COLORS.text,
  },
  placeholderText: {
    color: COLORS.mutedForeground,
  },
  overlay: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    backgroundColor: COLORS.popover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    color: COLORS.text,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.mutedForeground,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
});

// --- Exportações ---
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
};