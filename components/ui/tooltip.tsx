import React, { createContext, useContext, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type TooltipContextType = {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  position: { top: number; left: number };
  setPosition: (position: { top: number; left: number }) => void;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

// --- Componente Raiz: Tooltip ---
// O TooltipProvider não é estritamente necessário no nosso caso, então o omitimos.
function Tooltip({ children }: { children: React.ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const contextValue = { isVisible, setVisible, position, setPosition };

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TooltipTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TooltipContent
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {trigger}
      <Modal visible={isVisible} transparent={true} animationType="fade">
        {content}
      </Modal>
    </TooltipContext.Provider>
  );
}

// --- Componente Gatilho: TooltipTrigger ---
function TooltipTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipTrigger must be used within a Tooltip');

  const triggerRef = useRef<View>(null);

  const handleLongPress = () => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // Posiciona o tooltip acima do gatilho, centralizado horizontalmente
      context.setPosition({
        top: pageY - height - 8, // 8 é um offset
        left: pageX + width / 2,
      });
      context.setVisible(true);
    });
  };

  const handlePressOut = () => {
    context.setVisible(false);
  };
  return (
    <Pressable
      ref={triggerRef}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
    >
      {children}
    </Pressable>
  );
}

// --- Componente de Conteúdo: TooltipContent ---
function TooltipContent({ children, style }: { children: React.ReactNode; style?: ViewProps['style'] }) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipContent must be used within a Tooltip');

  return (
    <View style={[styles.tooltipContainer, { top: context.position.top, left: context.position.left }]}>
      <View style={[styles.tooltipBubble, style]}>
        <Text style={styles.tooltipText}>{children}</Text>
      </View>
      <View style={styles.arrow} />
    </View>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  primaryForeground: '#FFFFFF',
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
    // Centraliza o container na coordenada 'left'
    transform: [{ translateX: -50 }],
  },
  tooltipBubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {
    color: COLORS.primaryForeground,
    fontSize: 12,
    fontWeight: '500',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
  },
});

// --- Exportações ---
export { Tooltip, TooltipTrigger, TooltipContent };