import { Check, ChevronRight, Circle } from 'lucide-react-native';
import React, { createContext, useContext, useRef, useState } from 'react';
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
type DropdownMenuContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

// --- Componente Raiz: DropdownMenu ---
function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const triggerRef = useRef<View>(null);

  const contextValue = { isOpen, setIsOpen };

  // Separa o Trigger do Content
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuContent
  );
  
  const handleTriggerPress = () => {
    triggerRef.current?.measure((fx, fy, width, height, px, py) => {
        setTriggerLayout({ x: px, y: py, width, height });
        setIsOpen(true);
    });
  };

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {/* Adiciona a ref e o onPress ao trigger */}
      {trigger && React.cloneElement(trigger as React.ReactElement<any>, {
          ref: triggerRef,
          onPress: handleTriggerPress,
      })}
      
      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={() => setIsOpen(false)}>
        {/* Passa as informações de layout para o content */}
        {content && triggerLayout && React.cloneElement(content as React.ReactElement<{ triggerLayout: any }>, {
            triggerLayout: triggerLayout
        })}
      </Modal>
    </DropdownMenuContext.Provider>
  );
}

// --- Componente Gatilho: DropdownMenuTrigger ---
const DropdownMenuTrigger = React.forwardRef<View, { children: React.ReactNode, onPress?: () => void }>(
    ({ children, onPress }, ref) => {
        // Este componente age como um marcador e recebe a ref e o onPress do pai
        return React.cloneElement(React.Children.only(children) as React.ReactElement<any>, { ref, onPress });
    }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";


// --- Componente de Conteúdo: DropdownMenuContent ---
function DropdownMenuContent({ children, style, triggerLayout }: { children: React.ReactNode; style?: ViewProps['style'], triggerLayout: any }) {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuContent must be used within a DropdownMenu');
  
  return (
    <Pressable style={styles.overlay} onPress={() => context.setIsOpen(false)}>
      <View style={[styles.contentContainer, { top: triggerLayout.y + triggerLayout.height + 4, left: triggerLayout.x }, style]}>
        <ScrollView>{children}</ScrollView>
      </View>
    </Pressable>
  );
}

// --- Sub-componentes do Menu ---
function DropdownMenuItem({ children, onSelect }: { children: React.ReactNode; onSelect?: () => void; }) {
  const context = useContext(DropdownMenuContext);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect?.();
        context?.setIsOpen(false);
      }}
    >
        {children}
    </TouchableOpacity>
  );
}

function DropdownMenuCheckboxItem({ children, checked, onSelect }: { children: React.ReactNode; checked: boolean; onSelect?: () => void; }) {
    const context = useContext(DropdownMenuContext);
    return (
        <TouchableOpacity style={styles.item} onPress={() => { onSelect?.(); context?.setIsOpen(false); }}>
            <View style={styles.itemIndicator}>
                {checked && <Check size={16} color={COLORS.popoverForeground} />}
            </View>
            <Text style={styles.itemText}>{children}</Text>
        </TouchableOpacity>
    );
}

function DropdownMenuSeparator() {
  return <View style={styles.separator} />;
}

function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
    return <Text style={styles.label}>{children}</Text>;
}

function DropdownMenuShortcut({ children }: { children: React.ReactNode }) {
    return <Text style={styles.shortcut}>{children}</Text>;
}


// --- Estilos ---
const COLORS = {
  popover: '#FFFFFF',
  popoverForeground: '#020817',
  mutedForeground: '#64748B',
  border: '#E2E8F0',
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};