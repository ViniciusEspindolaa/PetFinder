import { ChevronDown } from 'lucide-react-native';
import React, { createContext, useContext, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// --- Contextos para gerenciar o estado ---
// Contexto raiz para controlar quais itens estão ativos
const AccordionContext = createContext<{
  activeValues: string[];
  toggleItem: (value: string) => void;
} | null>(null);

// Contexto do item para que o Trigger e o Content saibam seu estado
const AccordionItemContext = createContext<{ value: string; isOpen: boolean } | null>(
  null
);

// --- Componente Raiz: Accordion ---
type AccordionProps = {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
};

function Accordion({
  children,
  type = 'single',
  defaultValue,
}: AccordionProps) {
  const [activeValues, setActiveValues] = useState<string[]>(
    Array.isArray(defaultValue)
      ? defaultValue
      : typeof defaultValue === 'string'
      ? [defaultValue]
      : []
  );

  const toggleItem = (value: string) => {
    setActiveValues((prevValues) => {
      if (type === 'single') {
        return prevValues.includes(value) ? [] : [value];
      } else {
        // 'multiple'
        return prevValues.includes(value)
          ? prevValues.filter((v) => v !== value)
          : [...prevValues, value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ activeValues, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
}

// --- Componente do Item ---
type AccordionItemProps = {
  children: React.ReactNode;
  value: string; // ID único para cada item, similar ao Radix
};

function AccordionItem({ children, value }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isOpen = context.activeValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <View style={styles.itemContainer}>{children}</View>
    </AccordionItemContext.Provider>
  );
}

// --- Componente do Gatilho (Trigger) ---
type AccordionTriggerProps = {
  children: React.ReactNode;
};

function AccordionTrigger({ children }: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const { toggleItem } = accordionContext;
  const { value, isOpen } = itemContext;

  const rotation = useDerivedValue(() => withTiming(isOpen ? 180 : 0));
  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <TouchableOpacity
      style={styles.triggerContainer}
      onPress={() => toggleItem(value)}
      activeOpacity={0.7}
    >
      <Text style={styles.triggerText}>{children}</Text>
      <Animated.View style={[styles.triggerIcon, animatedChevronStyle]}>
        <ChevronDown size={20} color={styles.triggerText.color} />
      </Animated.View>
    </TouchableOpacity>
  );
}

// --- Componente do Conteúdo ---
type AccordionContentProps = {
  children: React.ReactNode;
};

function AccordionContent({ children }: AccordionContentProps) {
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  const { isOpen } = itemContext;
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedContentStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const measuredHeight = event.nativeEvent.layout.height;
    // Anima a abertura apenas se a altura for medida e o item estiver aberto
    if (measuredHeight > 0 && isOpen) {
      height.value = withTiming(measuredHeight);
      opacity.value = withTiming(1);
    }
  };

  // Anima o fechamento
  useDerivedValue(() => {
    if (!isOpen) {
      height.value = withTiming(0);
      opacity.value = withTiming(0);
    }
  });

  return (
    <Animated.View style={animatedContentStyle}>
      <View style={styles.contentContainer} onLayout={handleLayout}>
        <View style={styles.contentInner}>
          <Text style={styles.contentText}>{children}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// --- Estilos ---
const COLORS = {
  border: '#E0E0E0',
  text: '#2C3E50',
  mutedText: '#7F8C8D',
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  triggerIcon: {
    marginLeft: 16,
  },
  contentContainer: {
    // Posição absoluta para medir a altura sem afetar o layout quando fechado
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  contentInner: {
    paddingBottom: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.mutedText,
  },
});

// --- Exportações ---
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };