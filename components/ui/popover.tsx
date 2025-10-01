import React, { createContext, useContext, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number } | null) => void;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

// --- Componente Raiz: Popover ---
function Popover({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const triggerRef = useRef<View>(null);

  const contextValue = { isOpen, setIsOpen, triggerLayout, setTriggerLayout };

  // Separa o Trigger do Content
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PopoverTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PopoverContent
  );

  const handleTriggerPress = () => {
    // Mede a posição do gatilho na tela
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setTriggerLayout({ x: pageX, y: pageY, width, height });
      setIsOpen(true);
    });
  };

  return (
    <PopoverContext.Provider value={contextValue}>
      {/* Adiciona a ref e o onPress ao trigger */}
      {trigger &&
        React.cloneElement(
          trigger as React.ReactElement<React.ComponentPropsWithRef<typeof PopoverTrigger>>,
          {
            ref: triggerRef,
            onPress: handleTriggerPress,
          }
        )}

      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={() => setIsOpen(false)}>
        {/* Passa as informações de layout para o content */}
        {content && triggerLayout && React.cloneElement(content as React.ReactElement<PopoverContentProps>, {
            triggerLayout: triggerLayout
        })}
      </Modal>
    </PopoverContext.Provider>
  );
}

// --- Componente Gatilho: PopoverTrigger ---
const PopoverTrigger = React.forwardRef<View, { children: React.ReactNode; onPress?: () => void }>(
  ({ children, onPress }, ref) => {
    // A lógica de onPress é injetada pelo componente pai Popover
    return (
      <Pressable ref={ref} onPress={onPress}>
        {children}
      </Pressable>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";


// --- Componente de Conteúdo: PopoverContent ---
type PopoverContentProps = {
  children: React.ReactNode;
  style?: ViewProps['style'];
  triggerLayout?: { x: number; y: number; width: number; height: number };
};

function PopoverContent({ children, style, triggerLayout }: PopoverContentProps) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('PopoverContent must be used within a Popover');

  // Renderiza o conteúdo apenas se a posição do gatilho foi medida
  if (!triggerLayout) return null;

  return (
    <Pressable style={styles.overlay} onPress={() => context.setIsOpen(false)}>
      {/* Posiciona o conteúdo com base na medição do gatilho */}
      <Pressable style={[styles.contentContainer, { top: triggerLayout.y + triggerLayout.height + 4 }, style]}>
        {children}
      </Pressable>
    </Pressable>
  );
}

// --- Estilos ---
const COLORS = {
  popover: '#FFFFFF',
  border: '#E2E8F0',
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    width: 288, // w-72 da versão web
    backgroundColor: COLORS.popover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

// --- Exportações ---
export { Popover, PopoverTrigger, PopoverContent };