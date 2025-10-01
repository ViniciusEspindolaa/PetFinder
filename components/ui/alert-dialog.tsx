import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Contexto para gerenciar o estado de visibilidade ---
const AlertDialogContext = createContext<{
  setVisible: (visible: boolean) => void;
} | null>(null);

// --- Componente Raiz: AlertDialog ---
function AlertDialog({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  // Separa o Trigger do resto do conteúdo
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AlertDialogTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AlertDialogContent
  );

  return (
    <AlertDialogContext.Provider value={{ setVisible }}>
      {trigger}
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        {content}
      </Modal>
    </AlertDialogContext.Provider>
  );
}

// --- Componente Gatilho: AlertDialogTrigger ---
function AlertDialogTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialogTrigger must be used within an AlertDialog');
  }
  // Clona o elemento filho para adicionar a funcionalidade onPress
  return React.cloneElement(
    React.Children.only(children as React.ReactElement<any>),
    { onPress: () => context.setVisible(true) }
  );
}

// --- Componente de Conteúdo: AlertDialogContent ---
function AlertDialogContent({ children }: { children: React.ReactNode }) {
    const context = useContext(AlertDialogContext);
    return (
        <Pressable style={styles.overlay} onPress={() => context?.setVisible(false)}>
            {/* O Pressable interno impede que o toque no card feche o modal */}
            <Pressable style={styles.contentContainer}>
                {children}
            </Pressable>
        </Pressable>
    );
}

// --- Componentes de Layout ---
function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

// --- Componentes de Texto ---
function AlertDialogTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

function AlertDialogDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

// --- Componentes de Ação ---
type ButtonProps = { children: React.ReactNode; onPress?: () => void };

function AlertDialogAction({ children, onPress }: ButtonProps) {
  const context = useContext(AlertDialogContext);
  return (
    <TouchableOpacity
      style={[styles.button, styles.actionButton]}
      onPress={() => {
        onPress?.();
        context?.setVisible(false);
      }}
    >
      <Text style={[styles.buttonText, styles.actionButtonText]}>{children}</Text>
    </TouchableOpacity>
  );
}

function AlertDialogCancel({ children, onPress }: ButtonProps) {
  const context = useContext(AlertDialogContext);
  return (
    <TouchableOpacity
      style={[styles.button, styles.cancelButton]}
      onPress={() => {
        onPress?.();
        context?.setVisible(false);
      }}
    >
      <Text style={[styles.buttonText, styles.cancelButtonText]}>{children}</Text>
    </TouchableOpacity>
  );
}

// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.6)',
  title: '#111827',
  description: '#6B7280',
  border: '#E5E7EB',
  primary: '#EF4444', // Vermelho para ação destrutiva
  primaryText: '#FFFFFF',
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
    maxWidth: 400,
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
  header: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.title,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: COLORS.description,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row-reverse', // Ação principal fica à direita
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    color: COLORS.primaryText,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.title,
  },
});

// --- Exportações ---
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};