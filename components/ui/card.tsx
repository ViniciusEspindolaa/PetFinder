import React from 'react';
import { StyleSheet, Text, View, type TextProps, type ViewProps } from 'react-native';

// --- Tipos ---
type CardProps = ViewProps;
type CardHeaderProps = ViewProps;
type CardTitleProps = TextProps;
type CardDescriptionProps = TextProps;
type CardActionProps = ViewProps;
type CardContentProps = ViewProps;
type CardFooterProps = ViewProps;

// --- Componente Raiz: Card ---
function Card({ style, ...props }: CardProps) {
  return <View style={[styles.card, style]} {...props} />;
}

// --- Cabeçalho do Card ---
function CardHeader({ style, children, ...props }: CardHeaderProps) {
  // Separa o CardAction do resto do conteúdo (título, descrição)
  const action = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === CardAction
  );
  const otherChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type !== CardAction
  );

  return (
    <View style={[styles.header, style]} {...props}>
      <View style={styles.headerContent}>{otherChildren}</View>
      {action}
    </View>
  );
}

// --- Título do Card ---
function CardTitle({ style, ...props }: CardTitleProps) {
  return <Text style={[styles.title, style]} {...props} />;
}

// --- Descrição do Card ---
function CardDescription({ style, ...props }: CardDescriptionProps) {
  return <Text style={[styles.description, style]} {...props} />;
}

// --- Ação do Card (dentro do Header) ---
function CardAction({ style, ...props }: CardActionProps) {
  return <View style={style} {...props} />;
}

// --- Conteúdo do Card ---
function CardContent({ style, ...props }: CardContentProps) {
  return <View style={[styles.content, style]} {...props} />;
}

// --- Rodapé do Card ---
function CardFooter({ style, ...props }: CardFooterProps) {
  return <View style={[styles.footer, style]} {...props} />;
}

// --- Estilos ---
const COLORS = {
  card: '#FFFFFF',
  cardForeground: '#020817',
  border: '#E2E8F0',
  mutedForeground: '#64748B',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    // Sombra para iOS e Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerContent: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.cardForeground,
  },
  description: {
    fontSize: 14,
    color: COLORS.mutedForeground,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 0, // Assume que o espaçamento vem do conteúdo acima
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// --- Exportações ---
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};