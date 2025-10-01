import React, { createContext, useContext, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// --- Contexto para compartilhar o estado ---
const CollapsibleContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

// --- Componente Raiz: Collapsible ---
type CollapsibleProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

function Collapsible({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Determina se o componente é controlado ou não
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = () => {
    if (onOpenChange) {
      onOpenChange(!isOpen);
    } else {
      setInternalOpen(!isOpen);
    }
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <View>{children}</View>
    </CollapsibleContext.Provider>
  );
}

// --- Componente Gatilho: CollapsibleTrigger ---
type CollapsibleTriggerProps = {
  children: React.ReactElement<TouchableOpacityProps>;
};

function CollapsibleTrigger({ children }: CollapsibleTriggerProps) {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('CollapsibleTrigger must be used within a Collapsible');
  }

  // Clona o filho (geralmente um botão) e adiciona a função `onPress`
  return React.cloneElement(children, {
    onPress: (event) => {
      // Chama o onPress original do botão, se houver
      children.props.onPress?.(event);
      // Chama a função de toggle do contexto
      context.toggle();
    },
  });
}

// --- Componente de Conteúdo: CollapsibleContent ---
type CollapsibleContentProps = {
  children: React.ReactNode;
};

function CollapsibleContent({ children }: CollapsibleContentProps) {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('CollapsibleContent must be used within a Collapsible');
  }

  const { isOpen } = context;
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const measuredHeight = event.nativeEvent.layout.height;
    if (isOpen && measuredHeight > 0) {
      height.value = withTiming(measuredHeight);
      opacity.value = withTiming(1);
    }
  };

  useDerivedValue(() => {
    if (!isOpen) {
      height.value = withTiming(0);
      opacity.value = withTiming(0);
    }
  });

  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      {/* View interna para medir a altura real do conteúdo */}
      <View style={styles.contentContainer} onLayout={handleLayout}>
        {children}
      </View>
    </Animated.View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden', // Essencial para a animação de altura funcionar
  },
  contentContainer: {
    // Posição absoluta para que possamos medir sua altura sem que ela ocupe espaço quando fechada
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
});

// --- Exportações ---
export { Collapsible, CollapsibleTrigger, CollapsibleContent };