import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanelLeft } from 'lucide-react-native';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// --- Constantes e Tipos ---
const SIDEBAR_WIDTH = 256;
const SIDEBAR_WIDTH_COLLAPSED = 64;
const MOBILE_BREAKPOINT = 768;

type SidebarContextType = {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider');
  return context;
};

// --- Componente Provider ---
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);

  // Carrega o estado do AsyncStorage
  useEffect(() => {
    const loadState = async () => {
      const savedState = await AsyncStorage.getItem('sidebar_state');
      setIsOpen(savedState === 'expanded');
    };
    loadState();
  }, []);
  
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileOpen(prev => !prev);
    } else {
      const newState = !isOpen;
      setIsOpen(newState);
      AsyncStorage.setItem('sidebar_state', newState ? 'expanded' : 'collapsed');
    }
  }, [isMobile, isOpen]);

  const contextValue = { isOpen: isMobile ? isMobileOpen : isOpen, isMobile, toggleSidebar };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SidebarContext.Provider value={contextValue}>
            <View style={styles.providerContainer}>{children}</View>
        </SidebarContext.Provider>
    </GestureHandlerRootView>
  );
}

// --- Componente Principal: Sidebar ---
export function Sidebar({ children, side = 'left' }: { children: React.ReactNode; side?: 'left' | 'right' }) {
  const { isMobile, isOpen, toggleSidebar } = useSidebar();
  const { width } = useWindowDimensions();
  const animatedWidth = useSharedValue(isOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED);
  
  // Animação para desktop/tablet
  useEffect(() => {
    if (!isMobile) {
      animatedWidth.value = withTiming(isOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED, { duration: 200 });
    }
  }, [isOpen, isMobile, animatedWidth]);

  const desktopStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));
  
  // Animação para mobile (Sheet)
  const position = useSharedValue(side === 'left' ? -width : width);
  useEffect(() => {
    if (isMobile) {
        position.value = withTiming(isOpen ? 0 : (side === 'left' ? -width : width), { duration: 300, easing: Easing.out(Easing.quad) });
    }
  }, [isOpen, isMobile, position, width, side]);
  
  const mobileStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: position.value }]
  }));

  if (isMobile) {
    return (
      <Modal visible={isOpen} transparent={true} onRequestClose={toggleSidebar} animationType="none">
        <Pressable style={styles.mobileOverlay} onPress={toggleSidebar} />
        <Animated.View style={[styles.mobileSidebar, side === 'left' ? styles.mobileSidebarLeft : styles.mobileSidebarRight, mobileStyle]}>
          {children}
        </Animated.View>
      </Modal>
    );
  }

  return <Animated.View style={[styles.sidebarContainer, desktopStyle]}>{children}</Animated.View>;
}


// --- Sub-componentes ---
export function SidebarTrigger(props: React.ComponentProps<typeof TouchableOpacity>) {
  const { toggleSidebar } = useSidebar();
  return (
    <TouchableOpacity onPress={toggleSidebar} {...props}>
      <PanelLeft size={20} color={COLORS.text} />
    </TouchableOpacity>
  );
}

export function SidebarHeader(props: ViewProps) { return <View style={styles.header} {...props} />; }
export function SidebarContent(props: ViewProps) { return <ScrollView style={styles.content} {...props} />; }
export function SidebarFooter(props: ViewProps) { return <View style={styles.footer} {...props} />; }

export function SidebarMenuItem({ children, isActive = false }: { children: React.ReactNode, isActive?: boolean }) {
  const { isOpen } = useSidebar();
  
  const icon = React.Children.toArray(children).find(
    (child: any) => child.type && (child.type.displayName?.includes('LucideIcon') || typeof child.type === 'function')
  );
  const text = React.Children.toArray(children).find(
    (child: any) => child.type === Text
  );

  return (
    <TouchableOpacity style={[styles.menuItem, isActive && styles.menuItemActive]}>
      {icon && React.cloneElement(icon as any, { color: isActive ? COLORS.accentForeground : COLORS.mutedText })}
      {isOpen && text && React.cloneElement(text as any, { style: [styles.menuItemText, isActive && { color: COLORS.accentForeground }] })}
    </TouchableOpacity>
  );
}

// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  sidebar: '#F8FAFC',
  border: '#E2E8F0',
  accent: '#F1F5F9',
  accentForeground: '#1E293B',
  text: '#334155',
  mutedText: '#64748B',
};

const styles = StyleSheet.create({
  providerContainer: { flex: 1, flexDirection: 'row' },
  // Desktop
  sidebarContainer: {
    backgroundColor: COLORS.sidebar,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    padding: 8,
    gap: 8,
  },
  // Mobile
  mobileOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 300,
    backgroundColor: COLORS.sidebar,
    padding: 16,
    paddingTop: 40,
    gap: 16,
  },
  mobileSidebarLeft: { left: 0, borderRightWidth: 1, borderRightColor: COLORS.border },
  mobileSidebarRight: { right: 0, borderLeftWidth: 1, borderLeftColor: COLORS.border },
  // Componentes
  header: { padding: 8, gap: 8 },
  content: { flex: 1 },
  footer: { padding: 8, gap: 8, marginTop: 'auto' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 12,
    overflow: 'hidden',
  },
  menuItemActive: {
    backgroundColor: COLORS.accent,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
});

// --- Exportações ---
// A exportação do SidebarRail e outros componentes mais complexos foi omitida para simplificação.