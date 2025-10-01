import React, { createContext, useContext, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type HoverCardContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number } | null) => void;
};

const HoverCardContext = createContext<HoverCardContextType | null>(null);

// --- Componente Raiz: HoverCard ---
function HoverCard({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const triggerRef = useRef<View>(null);

  const contextValue = { isOpen, setIsOpen, triggerLayout, setTriggerLayout };

  // Separa o Trigger do Content
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === HoverCardTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === HoverCardContent
  );

  const handleTriggerPress = () => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setTriggerLayout({ x: pageX, y: pageY, width, height });
      setIsOpen(true);
    });
  };

  return (
    <HoverCardContext.Provider value={contextValue}>
      {/* Adiciona a ref e o onPress ao trigger */}
      {trigger && (
        <Pressable ref={triggerRef} onPress={handleTriggerPress}>
          {trigger}
        </Pressable>
      )}

      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={() => setIsOpen(false)}>
        {content}
      </Modal>
    </HoverCardContext.Provider>
  );
}

// --- Componente Gatilho: HoverCardTrigger ---
function HoverCardTrigger({ children }: { children: React.ReactNode }) {
  // A lógica de onPress é gerenciada pelo componente pai HoverCard
  return <>{children}</>;
}


// --- Componente de Conteúdo: HoverCardContent ---
function HoverCardContent({ children, style }: { children: React.ReactNode; style?: ViewProps['style'] }) {
  const context = useContext(HoverCardContext);
  if (!context) throw new Error('HoverCardContent must be used within a HoverCard');

  const { triggerLayout } = context;

  // Renderiza o conteúdo apenas se a posição do gatilho foi medida
  if (!triggerLayout) return null;

  return (
    <Pressable style={styles.overlay} onPress={() => context.setIsOpen(false)}>
      {/* Posiciona o conteúdo com base na medição do gatilho */}
      <Pressable style={[styles.contentContainer, { top: triggerLayout.y + triggerLayout.height + 4, left: triggerLayout.x }, style]}>
        {children}
      </Pressable>
    </Pressable>
  );
}

// --- Estilos ---
const COLORS = {
  popover: '#FFFFFF',
  popoverForeground: '#020817',
  border: '#E2E8F0',
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    width: 256, // Largura padrão do componente web
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
export { HoverCard, HoverCardTrigger, HoverCardContent };