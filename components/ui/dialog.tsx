import { X } from 'lucide-react-native';
import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type DialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

// --- Componente Raiz: Dialog ---
type DialogProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function Dialog({ children, open: controlledOpen, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const contextValue = { open, setOpen };

  // Separa o Trigger do resto do conteúdo
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DialogTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DialogContent
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {trigger}
      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {content}
      </Modal>
    </DialogContext.Provider>
  );
}

// --- Componente Gatilho: DialogTrigger ---
function DialogTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTrigger must be used within a Dialog');

  // Clona o elemento filho para adicionar a funcionalidade onPress
  return React.cloneElement(
    React.Children.only(children as React.ReactElement<any>),
    { onPress: () => context.setOpen(true) }
  );
}

// --- Componente para Fechar: DialogClose ---
function DialogClose({ children }: { children: React.ReactNode }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogClose must be used within a Dialog');

  // Cast to React.ReactElement<any> to allow onPress prop
  return React.cloneElement(
    React.Children.only(children as React.ReactElement<any>),
    { onPress: () => context.setOpen(false) }
  );
}

// --- Componente de Conteúdo: DialogContent ---
function DialogContent({ children, style }: { children: React.ReactNode; style?: ViewProps['style'] }) {
    const context = useContext(DialogContext);
    return (
        <Pressable style={styles.overlay} onPress={() => context?.setOpen(false)}>
            <Pressable style={[styles.contentContainer, style]}>
                {children}
                {/* Botão de fechar fixo no canto */}
                <TouchableOpacity style={styles.closeButton} onPress={() => context?.setOpen(false)}>
                    <X size={18} color={COLORS.mutedForeground} />
                </TouchableOpacity>
            </Pressable>
        </Pressable>
    );
}

// --- Componentes de Layout ---
function DialogHeader({ children, style }: ViewProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

function DialogFooter({ children, style }: ViewProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

// --- Componentes de Texto ---
function DialogTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

function DialogDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.6)',
  title: '#111827',
  description: '#6B7280',
  border: '#E5E7EB',
  mutedForeground: '#6B7280',
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
  },
  contentContainer: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      padding: 4,
      borderRadius: 4,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.title,
  },
  description: {
    fontSize: 14,
    color: COLORS.description,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
});

// --- Exportações ---
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};