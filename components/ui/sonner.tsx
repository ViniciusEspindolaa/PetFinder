import { CheckCircle, AlertCircle, Info } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

// --- Configuração Customizada (Opcional, mas recomendado para estilização) ---
// Aqui, customizamos a aparência dos toasts para usar ícones da Lucide e nossas cores.
const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      renderLeadingIcon={() => <CheckCircle color={COLORS.success} style={styles.icon} />}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      renderLeadingIcon={() => <AlertCircle color={COLORS.error} style={styles.icon} />}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      renderLeadingIcon={() => <Info color={COLORS.info} style={styles.icon} />}
    />
  ),
};


// --- Componente Provedor: Toaster ---
// Este componente deve ser colocado na raiz do seu App.
function Toaster() {
  return <Toast config={toastConfig} />;
}


// --- API Imperativa: toast ---
// Objeto helper para disparar toasts de qualquer lugar do app.
const toast = {
  success: (title: string, message?: string) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
  },
  error: (title: string, message?: string) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  },
  info: (title: string, message?: string) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
    });
  },
};


// --- Estilos ---
const COLORS = {
  success: '#27AE60',
  error: '#E74C3C',
  info: '#2980B9',
  background: '#FFFFFF',
  text: '#111827',
  mutedText: '#6B7280',
};

const styles = StyleSheet.create({
  baseToast: {
    borderLeftWidth: 4,
    width: '90%',
    height: 60,
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  successToast: {
    borderLeftColor: COLORS.success,
  },
  errorToast: {
    borderLeftColor: COLORS.error,
  },
  infoToast: {
    borderLeftColor: COLORS.info,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  message: {
    fontSize: 13,
    color: COLORS.mutedText,
  },
});


// --- Exportações ---
export { Toaster, toast };