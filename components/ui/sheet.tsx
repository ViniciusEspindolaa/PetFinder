import { X } from 'lucide-react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// --- Tipos e Contexto ---
type SheetContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const SheetContext = createContext<SheetContextType | null>(null);

// --- Componente Raiz: Sheet ---
function Sheet({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SheetTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SheetContent
  );

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {trigger}
      <Modal visible={isOpen} transparent={true} animationType="none" onRequestClose={() => setIsOpen(false)}>
        {content}
      </Modal>
    </SheetContext.Provider>
  );
}

// --- Componente Gatilho: SheetTrigger ---
function SheetTrigger({ children }: { children: React.ReactElement<{ onPress?: () => void }> }) {
  const context = useContext(SheetContext);
  if (!context) throw new Error('SheetTrigger must be used within a Sheet');
  return React.cloneElement(React.Children.only(children), {
    onPress: () => context.setIsOpen(true),
  });
}

// --- Componente para Fechar: SheetClose ---
function SheetClose({ children }: { children: React.ReactElement<{ onPress?: () => void }> }) {
  const context = useContext(SheetContext);
  if (!context) throw new Error('SheetClose must be used within a Sheet');
  return React.cloneElement(React.Children.only(children), {
    onPress: () => context.setIsOpen(false),
  });
}

// --- Componente de Conteúdo: SheetContent ---
type SheetContentProps = {
  children: React.ReactNode;
  style?: ViewProps['style'];
  side?: 'top' | 'bottom' | 'left' | 'right';
};

function SheetContent({ children, style, side = 'right' }: SheetContentProps) {
  const context = useContext(SheetContext);
  const { width, height } = useWindowDimensions();

  // Define a posição inicial fora da tela com base no 'side'
  const getInitialPosition = () => {
    switch (side) {
      case 'top': return -height;
      case 'bottom': return height;
      case 'left': return -width;
      case 'right': return width;
    }
  };

  const position = useSharedValue(getInitialPosition());
  const backdropOpacity = useSharedValue(0);

  // Anima a entrada e saída do sheet
  useEffect(() => {
    if (context?.isOpen) {
      position.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      position.value = withTiming(getInitialPosition(), { duration: 250, easing: Easing.in(Easing.quad) });
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [context?.isOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    const transform = side === 'left' || side === 'right'
      ? [{ translateX: position.value }]
      : [{ translateY: position.value }];
    return { transform };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));
  
  const contentSideStyle = styles[`content_${side}`];

  return (
    <>
      <Animated.View style={[styles.overlay, animatedBackdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => context?.setIsOpen(false)} />
      </Animated.View>
      <Animated.View style={[styles.contentContainer, contentSideStyle, animatedStyle, style]}>
        {children}
        <TouchableOpacity style={styles.closeButton} onPress={() => context?.setIsOpen(false)}>
          <X size={18} color={COLORS.mutedForeground} />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}


// --- Componentes de Layout ---
function SheetHeader({ children }: { children: React.ReactNode }) { return <View style={styles.header}>{children}</View>; }
function SheetFooter({ children }: { children: React.ReactNode }) { return <View style={styles.footer}>{children}</View>; }
function SheetTitle({ children }: { children: React.ReactNode }) { return <Text style={styles.title}>{children}</Text>; }
function SheetDescription({ children }: { children: React.ReactNode }) { return <Text style={styles.description}>{children}</Text>; }


// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  title: '#111827',
  description: '#6B7280',
  border: '#E5E7EB',
  mutedForeground: '#6B7280',
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.overlay },
  contentContainer: {
    position: 'absolute',
    backgroundColor: COLORS.background,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 10,
    padding: 16, gap: 16,
  },
  content_top: { top: 0, left: 0, right: 0, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  content_bottom: { bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: COLORS.border },
  content_left: { left: 0, top: 0, bottom: 0, width: '75%', borderRightWidth: 1, borderRightColor: COLORS.border },
  content_right: { right: 0, top: 0, bottom: 0, width: '75%', borderLeftWidth: 1, borderLeftColor: COLORS.border },
  closeButton: { position: 'absolute', top: 16, right: 16, padding: 4 },
  header: { gap: 4, padding: 16, paddingTop: 24, alignItems: 'center' },
  footer: { marginTop: 'auto', paddingTop: 16 },
  title: { fontSize: 18, fontWeight: '600', color: COLORS.title, textAlign: 'center' },
  description: { fontSize: 14, color: COLORS.description, textAlign: 'center' },
});


// --- Exportações ---
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};