import React, { createContext, useContext } from 'react';
import { StyleSheet, Text, View, type ViewProps, type TextProps } from 'react-native';

// --- Contexto para compartilhar a variante ---
const AlertContext = createContext<{ variant: 'default' | 'destructive' }>({
  variant: 'default',
});

// --- Tipos ---
type AlertProps = ViewProps & {
  variant?: 'default' | 'destructive';
  // Adicionamos uma prop 'icon' para simplificar o layout no React Native
  icon?: React.ReactNode; 
};

type AlertTitleProps = TextProps;
type AlertDescriptionProps = TextProps;

// --- Componente Raiz: Alert ---
function Alert({
  style,
  variant = 'default',
  icon,
  children,
  ...props
}: AlertProps) {
  const containerStyle = [
    styles.container,
    variant === 'default' && styles.containerDefault,
    variant === 'destructive' && styles.containerDestructive,
    style,
  ];

  return (
    <AlertContext.Provider value={{ variant }}>
      <View style={containerStyle} {...props}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </AlertContext.Provider>
  );
}

// --- Componente de Título: AlertTitle ---
function AlertTitle({ style, children, ...props }: AlertTitleProps) {
  const { variant } = useContext(AlertContext);
  const titleStyle = [
    styles.title,
    variant === 'default' && styles.titleDefault,
    variant === 'destructive' && styles.titleDestructive,
    style,
  ];
  return (
    <Text style={titleStyle} {...props}>
      {children}
    </Text>
  );
}

// --- Componente de Descrição: AlertDescription ---
function AlertDescription({
  style,
  children,
  ...props
}: AlertDescriptionProps) {
  const { variant } = useContext(AlertContext);
  const descriptionStyle = [
    styles.description,
    variant === 'default' && styles.descriptionDefault,
    variant === 'destructive' && styles.descriptionDestructive,
    style,
  ];
  return (
    <Text style={descriptionStyle} {...props}>
      {children}
    </Text>
  );
}

// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  text: '#111827',
  border: '#E5E7EB',
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  mutedText: '#6B7280',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    // Para alinhar o ícone com a primeira linha do texto
    paddingTop: 2, 
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  // Variantes
  containerDefault: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  titleDefault: {
    color: COLORS.text,
  },
  descriptionDefault: {
    color: COLORS.mutedText,
  },
  containerDestructive: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)', // Fundo vermelho claro
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  titleDestructive: {
    color: COLORS.destructive,
  },
  descriptionDestructive: {
    color: 'rgba(239, 68, 68, 0.9)',
  },
});

// --- Exportações ---
export { Alert, AlertTitle, AlertDescription };