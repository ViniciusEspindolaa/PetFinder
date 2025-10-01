import { Check, Circle } from 'lucide-react-native';
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
type MenubarContextType = {
  openMenu: string | null;
  setOpenMenu: (name: string | null) => void;
  setPosition: (position: { x: number; y: number; width: number; height: number } | null) => void;
};

const MenubarContext = createContext<MenubarContextType | null>(null);

// --- Componente Raiz: Menubar ---
function Menubar({ children, style }: { children: React.ReactNode; style?: ViewProps['style'] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  
  const contextValue = { openMenu, setOpenMenu, setPosition };

  // Agrupa os menus
  const menus = (React.Children.toArray(children) as React.ReactElement[]).filter(
    (child) => React.isValidElement(child) && child.type === MenubarMenu
  );

  return (
    <MenubarContext.Provider value={contextValue}>
      <View style={[styles.menubar, style]}>{menus}</View>
      {/* O conteúdo do menu aberto é renderizado aqui */}
      {menus.map((menu) => {
        const menuElement = menu as React.ReactElement<{ value: string; children: React.ReactNode }>;
        if (menuElement.props.value === openMenu && position) {
          const content = React.Children.toArray(menuElement.props.children).find(
            (child) => React.isValidElement(child) && child.type === MenubarContent
          );
          return content && React.cloneElement(content as React.ReactElement<{ triggerLayout: any }>, {
            key: (menu as React.ReactElement<{ value: string }>).props.value,
            triggerLayout: position
          });
        }
        return null;
      })}
    </MenubarContext.Provider>
  );
}

// --- Componente de Menu Individual ---
function MenubarMenu({ children, value }: { children: React.ReactNode, value: string }) {
    const trigger = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === MenubarTrigger
    );
    // Adiciona o 'value' ao trigger para identificação
    return trigger && React.cloneElement(trigger as React.ReactElement<{ value?: string }>, { value });
}


// --- Componente Gatilho: MenubarTrigger ---
const MenubarTrigger = React.forwardRef<View, { children: React.ReactNode, value?: string }>(
  ({ children, value }, ref) => {
    const context = useContext(MenubarContext);
    const triggerRef = useRef<View>(null);

    const handlePress = () => {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        context?.setPosition({ x: pageX, y: pageY, width, height });
        context?.setOpenMenu(value === context.openMenu ? null : value || null);
      });
    };

    return (
      <TouchableOpacity ref={triggerRef} style={styles.trigger} onPress={handlePress}>
        <Text style={styles.triggerText}>{children}</Text>
      </TouchableOpacity>
    );
  }
);
MenubarTrigger.displayName = "MenubarTrigger";

// --- Componente de Conteúdo: MenubarContent ---
function MenubarContent({ children, style, triggerLayout }: { children: React.ReactNode; style?: ViewProps['style'], triggerLayout: any }) {
  const context = useContext(MenubarContext);
  return (
    <Modal visible={true} transparent={true} animationType="fade" onRequestClose={() => context?.setOpenMenu(null)}>
      <Pressable style={styles.overlay} onPress={() => context?.setOpenMenu(null)}>
        <View style={[styles.contentContainer, { top: triggerLayout.y + triggerLayout.height + 4, left: triggerLayout.x }, style]}>
          <ScrollView>{children}</ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

// --- Sub-componentes do Menu ---
function MenubarItem({ children, onSelect }: { children: React.ReactNode; onSelect?: () => void; }) {
  const context = useContext(MenubarContext);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect?.();
        context?.setOpenMenu(null);
      }}
    >{children}</TouchableOpacity>
  );
}

function MenubarCheckboxItem({ children, checked, onSelect }: { children: React.ReactNode; checked: boolean; onSelect?: () => void; }) {
    return (
        <MenubarItem onSelect={onSelect}>
            <View style={styles.itemIndicator}>
                {checked && <Check size={16} color={COLORS.text} />}
            </View>
            <Text style={styles.itemText}>{children}</Text>
        </MenubarItem>
    );
}

function MenubarRadioItem({ children, selected, onSelect }: { children: React.ReactNode; selected: boolean; onSelect?: () => void; }) {
    return (
        <MenubarItem onSelect={onSelect}>
            <View style={styles.itemIndicator}>
                {selected && <Circle size={8} color={COLORS.text} fill={COLORS.text}/>}
            </View>
            <Text style={styles.itemText}>{children}</Text>
        </MenubarItem>
    );
}

function MenubarSeparator() {
  return <View style={styles.separator} />;
}

function MenubarLabel({ children }: { children: React.ReactNode }) {
    return <Text style={styles.label}>{children}</Text>;
}

function MenubarShortcut({ children }: { children: React.ReactNode }) {
    return <Text style={styles.shortcut}>{children}</Text>;
}

// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  popover: '#FFFFFF',
  text: '#111827',
  mutedForeground: '#6B7280',
  border: '#E2E8F0',
  accent: '#F1F5F9',
};

const styles = StyleSheet.create({
  menubar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 4,
    alignSelf: 'flex-start',
  },
  trigger: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
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
    color: COLORS.text,
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
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
};