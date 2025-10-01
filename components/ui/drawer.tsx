import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';

// --- Tipos e Contexto ---
type DrawerContextType = {
  present: () => void;
  dismiss: () => void;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

// --- Componente Raiz: Drawer ---
// NOTA: Para que o Drawer funcione, seu App precisa estar envolvido por <GestureHandlerRootView>
function Drawer({ children }: { children: React.ReactNode }) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const present = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const dismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // Separa o Trigger do Content
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DrawerTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DrawerContent
  );

  return (
    <DrawerContext.Provider value={{ present, dismiss }}>
      {/* O Provider do BottomSheet deve envolver a parte da árvore que usa o Drawer */}
      <BottomSheetModalProvider>
        {trigger}
        {/* Passa a ref para o conteúdo ser renderizado dentro do modal */}
        {content && React.cloneElement(content as React.ReactElement<any, string | React.JSXElementConstructor<any>> & { ref?: React.Ref<BottomSheetModal> }, { ref: bottomSheetModalRef })}
      </BottomSheetModalProvider>
    </DrawerContext.Provider>
  );
}

// --- Componente Gatilho: DrawerTrigger ---
function DrawerTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(DrawerContext);
  if (!context) throw new Error('DrawerTrigger must be used within a Drawer');

  // Assume child is a Pressable or Touchable element that accepts onPress
  return React.cloneElement(
    React.Children.only(children as React.ReactElement<{ onPress?: () => void }>),
    {
      onPress: () => context.present(),
    }
  );
}

// --- Componente para Fechar: DrawerClose ---
function DrawerClose({ children }: { children: React.ReactNode }) {
  const context = useContext(DrawerContext);
  if (!context) throw new Error('DrawerClose must be used within a Drawer');

  return React.cloneElement(
    React.Children.only(children as React.ReactElement<{ onPress?: () => void }>),
    {
      onPress: () => context.dismiss(),
    }
  );
}

// --- Componente de Conteúdo: DrawerContent ---
const DrawerContent = React.forwardRef<BottomSheetModal, { children: React.ReactNode }>(
  ({ children }, ref) => {
    // Pontos de parada da "gaveta". Pode ser customizado.
    const snapPoints = useMemo(() => ['50%', '80%'], []);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        handleComponent={() => <View style={styles.handle} />}
        backdropComponent={(props) => <Pressable {...props} style={styles.overlay} />}
      >
        <BottomSheetView style={styles.contentContainer}>
            {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
DrawerContent.displayName = "DrawerContent"


// --- Componentes de Layout ---
function DrawerHeader({ children, style }: ViewProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

function DrawerFooter({ children, style }: ViewProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

// --- Componentes de Texto ---
function DrawerTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

function DrawerDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  handle: '#E5E7EB',
  title: '#111827',
  description: '#6B7280',
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background
  },
  handle: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.handle,
    alignSelf: 'center',
    marginTop: 8,
  },
  header: {
    gap: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.title,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: COLORS.description,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto', // Empurra o rodapé para o final
    paddingTop: 16,
  },
});

// --- Exportações ---
export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};