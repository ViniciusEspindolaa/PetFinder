import { GripVertical } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

// --- Largura do divisor ---
const HANDLE_WIDTH = 12;

// --- Componente Raiz: ResizablePanelGroup ---
function ResizablePanelGroup({ children }: { children: React.ReactNode }) {
  const [containerWidth, setContainerWidth] = React.useState(0);
  
  // Encontra os painéis e o divisor nos filhos
  const panels = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === ResizablePanel
  );
  const handle = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ResizableHandle
  );

  if (panels.length !== 2 || !handle) {
    throw new Error('<ResizablePanelGroup> deve ter exatamente dois <ResizablePanel> e um <ResizableHandle>.');
  }

  const [panel1, panel2] = panels;
  const panel1DefaultSize = (panel1 as React.ReactElement<{ defaultSize?: number }>).props.defaultSize || 50;
  
  // Shared value para a posição do divisor (em porcentagem)
  const position = useSharedValue(panel1DefaultSize);
  const startPosition = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      startPosition.value = position.value;
    })
    .onUpdate((event) => {
      if (containerWidth === 0) return;
      // Calcula a nova posição em porcentagem
      const newPosition = startPosition.value + (event.translationX / containerWidth) * 100;
      // Limita a posição entre 10% e 90% para evitar que os painéis desapareçam
      position.value = Math.max(10, Math.min(90, newPosition));
    });

  // Estilos animados para os painéis
  const panel1Style = useAnimatedStyle(() => ({
    flexGrow: position.value,
  }));
  const panel2Style = useAnimatedStyle(() => ({
    flexGrow: 100 - position.value,
  }));

  return (
    <View 
        style={styles.groupContainer}
        onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
    >
        <Animated.View style={[styles.panel, panel1Style]}>
            {panel1}
        </Animated.View>

        <GestureDetector gesture={dragGesture}>
            <Animated.View style={styles.handleContainer}>
                {handle}
            </Animated.View>
        </GestureDetector>

        <Animated.View style={[styles.panel, panel2Style]}>
            {panel2}
        </Animated.View>
    </View>
  );
}

// --- Painel Redimensionável ---
function ResizablePanel({ children, defaultSize }: { children: React.ReactNode; defaultSize?: number }) {
  // Este componente é um "marcador", o conteúdo é renderizado pelo pai
  return <View style={{ flex: 1, overflow: 'hidden' }}>{children}</View>;
}

// --- Divisor Arrastável ---
function ResizableHandle({ withHandle = false }: { withHandle?: boolean }) {
  return (
    <View style={styles.handle}>
      {withHandle && (
        <View style={styles.handleIndicator}>
          <GripVertical size={12} color={COLORS.handleForeground} />
        </View>
      )}
    </View>
  );
}

// --- Estilos ---
const COLORS = {
  border: '#E2E8F0',
  handleForeground: '#64748B',
};

const styles = StyleSheet.create({
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.border,
  },
  panel: {
    // A largura é controlada pelo flexGrow nos estilos animados
  },
  handleContainer: {
    width: HANDLE_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Garante que a área de toque seja maior
  },
  handle: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleIndicator: {
    position: 'absolute',
    width: HANDLE_WIDTH,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// --- Exportações ---
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };