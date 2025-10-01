import { Check, ChevronRight, Circle } from 'lucide-react-native';
import React, { createContext, useContext, useState } from 'react';
import {
  GestureResponderEvent,
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
type ContextMenuContextType = {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
};

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

// --- Componente Raiz: ContextMenu ---
function ContextMenu({ children }: { children: React.ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const contextValue = { isVisible, setVisible, position, setPosition };

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ContextMenuTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ContextMenuContent
  );

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {trigger}
      <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={() => setVisible(false)}>
        {content}
      </Modal>
    </ContextMenuContext.Provider>
  );
}

// --- Componente Gatilho: ContextMenuTrigger ---
function ContextMenuTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error('ContextMenuTrigger must be used within a ContextMenu');

  const handleLongPress = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    context.setPosition({ x: pageX, y: pageY });
    context.setVisible(true);
  };

  // Clona o filho para adicionar a funcionalidade de toque longo
  return React.cloneElement(
    React.Children.only(children) as React.ReactElement<any>,
    { onLongPress: handleLongPress }
  );
}

// --- Componente de Conteúdo: ContextMenuContent ---
function ContextMenuContent({ children, style }: { children: React.ReactNode; style?: ViewProps['style'] }) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error('ContextMenuContent must be used within a ContextMenu');
  
  return (
    <Pressable style={styles.overlay} onPress={() => context.setVisible(false)}>
      <View style={[styles.contentContainer, { top: context.position.y, left: context.position.x }, style]}>
        <ScrollView>{children}</ScrollView>
      </View>
    </Pressable>
  );
}

// --- Sub-componentes do Menu ---
function ContextMenuItem({ children, onSelect, destructive = false }: { children: React.ReactNode; onSelect?: () => void; destructive?: boolean }) {
  const context = useContext(ContextMenuContext);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect?.();
        context?.setVisible(false);
      }}
    >
        {/* Lógica para adicionar ícones ou atalhos como filhos */}
        {children}
    </TouchableOpacity>
  );
}

function ContextMenuCheckboxItem({ children, checked, onSelect }: { children: React.ReactNode; checked: boolean; onSelect?: () => void; }) {
    const context = useContext(ContextMenuContext);
    return (
        <TouchableOpacity style={styles.item} onPress={() => { onSelect?.(); context?.setVisible(false); }}>
            <View style={styles.itemIndicator}>
                {checked && <Check size={16} color={COLORS.popoverForeground} />}
            </View>
            <Text style={styles.itemText}>{children}</Text>
        </TouchableOpacity>
    );
}

function ContextMenuSeparator() {
  return <View style={styles.separator} />;
}

function ContextMenuLabel({ children }: { children: React.ReactNode }) {
    return <Text style={styles.label}>{children}</Text>;
}

function ContextMenuShortcut({ children }: { children: React.ReactNode }) {
    return <Text style={styles.shortcut}>{children}</Text>;
}


// --- Estilos ---
const COLORS = {
  popover: '#FFFFFF',
  popoverForeground: '#020817',
  mutedForeground: '#64748B',
  border: '#E2E8F0',
  accent: '#F1F5F9',
  destructive: '#EF4444',
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    minWidth: 220,
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
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    color: COLORS.popoverForeground,
    flex: 1,
  },
  itemIndicator: {
    width: 24,
    alignItems: 'center',
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.mutedForeground,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  shortcut: {
    fontSize: 12,
    color: COLORS.mutedForeground,
  },
});

// --- Exportações ---
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
};