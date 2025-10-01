import { ChevronDown } from 'lucide-react-native';
import React, { createContext, useContext, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  ViewProps,
} from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

// Habilitar LayoutAnimation no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Tipos e Contexto ---
type NavMenuContextType = {
  activeMenu: string | null;
  setActiveMenu: (value: string | null) => void;
};

const NavigationMenuContext = createContext<NavMenuContextType | null>(null);

// --- Componente Raiz: NavigationMenu ---
function NavigationMenu({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const contextValue = { activeMenu, setActiveMenu };

  const list = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === NavigationMenuList
  );
  
  // Encontra o conteúdo do menu que está ativo
  let activeContent: React.ReactNode = null;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === NavigationMenuList) {
        React.Children.forEach((child.props as { children: React.ReactNode }).children, (item: React.ReactNode) => {
            if (React.isValidElement(item) && item.type === NavigationMenuItem && (item.props as { value: string }).value === activeMenu) {
                activeContent = React.Children.toArray((item.props as { children: React.ReactNode }).children).find(
                    (contentChild) => React.isValidElement(contentChild) && contentChild.type === NavigationMenuContent
                );
            }
        });
    }
  });

  return (
    <NavigationMenuContext.Provider value={contextValue}>
      <View>
        {list}
        {activeContent && (
          <View style={styles.viewport}>
            {activeContent}
          </View>
        )}
      </View>
    </NavigationMenuContext.Provider>
  );
}

// --- Componentes de Layout ---
function NavigationMenuList({ children, style }: ViewProps) {
  return <View style={[styles.list, style]}>{children}</View>;
}

function NavigationMenuItem({ children, value }: { children: React.ReactNode, value: string }) {
    // Passa o 'value' para o Trigger para identificação
    return React.Children.map(children, child => {
        if(React.isValidElement(child) && child.type === NavigationMenuTrigger) {
            return React.cloneElement(child, { value } as any);
        }
        return child;
    });
}

// --- Componente Gatilho: NavigationMenuTrigger ---
function NavigationMenuTrigger({ children, value }: { children: React.ReactNode, value?: string }) {
  const context = useContext(NavigationMenuContext);
  if (!context) throw new Error('NavigationMenuTrigger must be used within a NavigationMenu');

  const { activeMenu, setActiveMenu } = context;
  const isOpen = activeMenu === value;

  const rotation = useDerivedValue(() => withTiming(isOpen ? 180 : 0));
  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveMenu(isOpen ? null : value || null);
  };

  return (
    <TouchableOpacity
      style={[styles.trigger, isOpen && styles.triggerActive]}
      onPress={handlePress}
    >
      <Text style={[styles.triggerText, isOpen && styles.triggerTextActive]}>{children}</Text>
      <Animated.View style={animatedChevronStyle}>
        <ChevronDown size={14} color={isOpen ? COLORS.accentForeground : COLORS.text} />
      </Animated.View>
    </TouchableOpacity>
  );
}

// --- Componente de Conteúdo: NavigationMenuContent ---
function NavigationMenuContent({ children, style }: ViewProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

// --- Componente de Link (Item clicável dentro do conteúdo) ---
function NavigationMenuLink({ children, style, ...props }: React.ComponentProps<typeof TouchableOpacity>) {
  return (
    <TouchableOpacity style={[styles.link, style]} {...props}>
        {children}
    </TouchableOpacity>
  );
}


// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  accent: '#F1F5F9',
  accentForeground: '#1E293B',
  text: '#334155',
  border: '#E2E8F0',
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  triggerActive: {
    backgroundColor: COLORS.accent,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  triggerTextActive: {
    color: COLORS.accentForeground,
  },
  viewport: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    padding: 12,
  },
  link: {
    borderRadius: 8,
    padding: 12,
  },
});

// --- Exportações ---
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};