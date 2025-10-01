import { SearchIcon } from 'lucide-react-native';
import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type CommandContextType = {
  search: string;
  setSearch: (search: string) => void;
  filteredItems: any[];
};

const CommandContext = createContext<CommandContextType | null>(null);

// --- Componentes Marcadores (usados para estruturar os dados) ---
// Estes componentes não renderizam nada diretamente, eles servem como "marcadores"
// para que o componente Command possa processar seus filhos.
const CommandGroup = (props: { heading?: string, children: React.ReactNode }) => null;
const CommandItem = (props: { value: string, onSelect: () => void, children: React.ReactNode }) => null;
const CommandEmpty = (props: { children: React.ReactNode }) => null;
const CommandSeparator = () => null;

// --- Componente Raiz: Command ---
function Command({ children, ...props }: ViewProps) {
  const [search, setSearch] = useState('');

  // Lógica principal para processar e filtrar os itens
  const { items, empty } = useMemo(() => {
    const allItems: any[] = [];
    let emptyComponent: React.ReactNode = <Text style={styles.emptyText}>Nenhum resultado.</Text>;

    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        if (child.type === CommandList) {
          React.Children.forEach((child as React.ReactElement<{ children: React.ReactNode }>).props.children, listItem => {
            if (React.isValidElement(listItem)) {
              if (listItem.type === CommandGroup) {
                allItems.push({ type: 'group', value: (listItem as React.ReactElement<{ heading?: string }>).props.heading });
                React.Children.forEach(
                  (listItem as React.ReactElement<{ children: React.ReactNode }>).props.children,
                  groupItem => {
                    if (React.isValidElement(groupItem) && groupItem.type === CommandItem) {
                      if (groupItem.props && typeof groupItem.props === 'object') {
                        allItems.push({ type: 'item', ...groupItem.props });
                      }
                    }
                  }
                );
              } else if (listItem.type === CommandItem) {
                if (listItem.props && typeof listItem.props === 'object') {
                  allItems.push({ type: 'item', ...listItem.props });
                }
              } else if (listItem.type === CommandEmpty) {
                emptyComponent = (listItem as React.ReactElement<{ children: React.ReactNode }>).props.children;
              }
            }
          });
        }
      }
    });

    const filtered = allItems.filter(item => {
        if (item.type === 'group') return true; // Sempre mostrar grupos
        return item.value.toLowerCase().includes(search.toLowerCase());
    });
    
    // Remove grupos vazios
    const cleanedFiltered = filtered.filter((item, index) => {
        if(item.type === 'group' && (filtered[index + 1]?.type === 'group' || index === filtered.length - 1)) {
            return false;
        }
        return true;
    })

    return { items: cleanedFiltered, empty: emptyComponent };
  }, [children, search]);

  return (
    <CommandContext.Provider value={{ search, setSearch, filteredItems: items }}>
      <View style={styles.commandContainer} {...props}>
        {React.Children.map(children, child => {
            // Renderiza os filhos, exceto a lista, que será renderizada pelo CommandList
            if (React.isValidElement(child) && child.type !== CommandList) {
                return child;
            }
            // Passa o empty component para o CommandList
            if(React.isValidElement(child) && child.type === CommandList) {
                return React.cloneElement(child as React.ReactElement<{ emptyComponent?: React.ReactNode }>, { emptyComponent: empty });
            }
            return null;
        })}
      </View>
    </CommandContext.Provider>
  );
}

// --- Componentes Filhos ---
function CommandInput(props: React.ComponentProps<typeof TextInput>) {
  const context = useContext(CommandContext);
  if (!context) throw new Error('CommandInput must be used within a Command');

  return (
    <View style={styles.inputWrapper}>
      <SearchIcon size={18} color={COLORS.mutedForeground} />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        value={context.search}
        onChangeText={context.setSearch}
        {...props}
      />
    </View>
  );
}

function CommandList({ emptyComponent }: { children: React.ReactNode, emptyComponent?: React.ReactNode }) {
  const context = useContext(CommandContext);
  if (!context) throw new Error('CommandList must be used within a Command');

  return (
    <FlatList
      data={context.filteredItems}
      keyExtractor={(item, index) => item.value + index}
      renderItem={({ item }) => {
        if (item.type === 'group') {
          return <Text style={styles.groupHeading}>{item.value}</Text>;
        }
        if (item.type === 'item') {
          return (
            <TouchableOpacity style={styles.item} onPress={item.onSelect}>
              {typeof item.children === 'string' ? <Text style={styles.itemText}>{item.children}</Text> : item.children}
            </TouchableOpacity>
          );
        }
        return null;
      }}
      ListEmptyComponent={() => <View style={styles.emptyContainer}>{emptyComponent}</View>}
      keyboardShouldPersistTaps="handled"
    />
  );
}

function CommandDialog({ open, onOpenChange, children }: { open: boolean, onOpenChange: (open: boolean) => void, children: React.ReactNode }) {
    return (
        <Modal
            visible={open}
            transparent={true}
            animationType="fade"
            onRequestClose={() => onOpenChange(false)}
        >
            <Pressable style={styles.dialogOverlay} onPress={() => onOpenChange(false)}>
                <Pressable style={styles.dialogContent}>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

// --- Estilos ---
const COLORS = {
  popover: '#FFFFFF',
  popoverForeground: '#020817',
  mutedForeground: '#64748B',
  border: '#E2E8F0',
  accent: '#F1F5F9',
};

const styles = StyleSheet.create({
  commandContainer: {
    backgroundColor: COLORS.popover,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.popoverForeground,
  },
  groupHeading: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.mutedForeground,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.popoverForeground,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
      color: COLORS.mutedForeground,
  },
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-start',
    paddingTop: '20%',
  },
  dialogContent: {
    backgroundColor: COLORS.popover,
    marginHorizontal: 16,
    borderRadius: 12,
    maxHeight: '70%',
  },
});

// --- Exportações ---
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};