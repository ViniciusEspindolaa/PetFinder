import { ChevronRight, MoreHorizontal } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  StyleProp,
  TextStyle,
} from 'react-native';

// --- Tipos ---
type BreadcrumbProps = ViewProps;
type BreadcrumbListProps = ViewProps;
type BreadcrumbItemProps = ViewProps;
type BreadcrumbLinkProps = TouchableOpacityProps;
type BreadcrumbPageProps = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
} & ViewProps;
type BreadcrumbSeparatorProps = ViewProps;
type BreadcrumbEllipsisProps = TouchableOpacityProps;

// --- Componente Raiz ---
function Breadcrumb({ style, ...props }: BreadcrumbProps) {
  // No React Native, <nav> é apenas uma <View> semântica
  return <View style={style} {...props} />;
}

// --- Lista de Itens ---
function BreadcrumbList({ style, ...props }: BreadcrumbListProps) {
  // <ol> se torna uma <View> com flexbox e quebra de linha
  return <View style={[styles.list, style]} {...props} />;
}

// --- Item Individual ---
function BreadcrumbItem({ style, ...props }: BreadcrumbItemProps) {
  // <li> se torna uma <View> que alinha o link e o separador
  return <View style={[styles.item, style]} {...props} />;
}

// --- Link Clicável ---
function BreadcrumbLink({ style, children, ...props }: BreadcrumbLinkProps) {
  // <a> se torna um <TouchableOpacity> com um <Text> dentro
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
}

// --- Página Atual (Não Clicável) ---
function BreadcrumbPage({ style, children, ...props }: BreadcrumbPageProps) {
  // <span> se torna um <Text> com estilo diferente para indicar a página ativa
  return <Text style={[styles.page, style]} {...props}>{children}</Text>;
}

// --- Separador ---
function BreadcrumbSeparator({ children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <View style={styles.separator} {...props}>
      {children ?? <ChevronRight size={16} color={COLORS.mutedForeground} />}
    </View>
  );
}

// --- Elipse (...) ---
function BreadcrumbEllipsis({ style, ...props }: BreadcrumbEllipsisProps) {
  return (
    <TouchableOpacity style={style} {...props}>
      <MoreHorizontal size={16} color={COLORS.mutedForeground} />
    </TouchableOpacity>
  );
}

// --- Estilos ---
const COLORS = {
  foreground: '#111827',
  mutedForeground: '#6B7280',
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os itens quebrem para a próxima linha
    alignItems: 'center',
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  link: {
    fontSize: 14,
    color: COLORS.mutedForeground,
  },
  page: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.foreground,
  },
  separator: {
    marginHorizontal: 2,
    // Add other valid View style properties if needed
  },
  // Removed ellipsis style because color is not a valid ViewStyle property
});

// --- Exportações ---
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};