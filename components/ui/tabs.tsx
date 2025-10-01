import React, { createContext, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

// --- Componente Raiz: Tabs ---
type TabsProps = ViewProps & {
  defaultValue: string;
};

function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const contextValue = { activeTab, setActiveTab };

  // Separa a lista de gatilhos (TabsList) dos conteúdos (TabsContent)
  const list = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TabsList
  );
  // Filtra para encontrar APENAS o conteúdo da aba ativa
  const content = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      child.type === TabsContent &&
      (child.props as { value: string }).value === activeTab
  );

  return (
    <TabsContext.Provider value={contextValue}>
      {list}
      {content}
    </TabsContext.Provider>
  );
}

// --- Lista de Gatilhos: TabsList ---
function TabsList({ children, style }: ViewProps) {
  return <View style={[styles.list, style]}>{children}</View>;
}

// --- Gatilho (Botão da Aba): TabsTrigger ---
type TabsTriggerProps = React.ComponentProps<typeof TouchableOpacity> & {
  value: string;
  children: React.ReactNode;
};

function TabsTrigger({ value, children, style }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <TouchableOpacity
      style={[styles.trigger, isActive && styles.triggerActive, style]}
      onPress={() => setActiveTab(value)}
    >
      <Text style={[styles.triggerText, isActive && styles.triggerTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

// --- Conteúdo da Aba: TabsContent ---
type TabsContentProps = ViewProps & {
  value: string;
};

function TabsContent({ value, children, style }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');
  
  // O componente pai (Tabs) já filtra, então aqui apenas renderizamos
  return <View style={style}>{children}</View>;
}


// --- Estilos ---
const COLORS = {
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
  card: '#FFFFFF',
  foreground: '#1E293B',
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    backgroundColor: COLORS.muted,
    borderRadius: 8,
    padding: 4,
    alignSelf: 'flex-start', // Para não ocupar a largura toda
  },
  trigger: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  triggerActive: {
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  triggerTextActive: {
    color: COLORS.foreground,
  },
});

// --- Exportações ---
export { Tabs, TabsList, TabsTrigger, TabsContent };