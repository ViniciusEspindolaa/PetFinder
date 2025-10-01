import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from 'react-native';

// --- Tipos ---
type TableProps = ViewProps;
type TableHeaderProps = ViewProps;
type TableBodyProps = ViewProps;
type TableFooterProps = ViewProps;
type TableRowProps = ViewProps;
type TableHeadProps = ViewProps;
type TableCellProps = ViewProps;
type TableCaptionProps = TextProps;

// --- Componente Raiz: Table ---
function Table({ style, children, ...props }: TableProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.table, style]} {...props}>
        {children}
      </View>
    </ScrollView>
  );
}

// --- Componentes de Estrutura ---
function TableHeader({ style, ...props }: TableHeaderProps) {
  // <thead> é uma View que contém as linhas do cabeçalho
  return <View style={style} {...props} />;
}

function TableBody({ style, ...props }: TableBodyProps) {
  // <tbody> é uma View que contém as linhas do corpo
  return <View style={style} {...props} />;
}

function TableFooter({ style, ...props }: TableFooterProps) {
  return <View style={[styles.footer, style]} {...props} />;
}

// --- Linha da Tabela ---
function TableRow({ style, ...props }: TableRowProps) {
  // <tr> é uma View com flexDirection: 'row'
  return <View style={[styles.row, style]} {...props} />;
}

// --- Célula do Cabeçalho ---
function TableHead({ style, children, ...props }: TableHeadProps) {
  // <th> é uma View com um Text dentro para o conteúdo
  return (
    <View style={[styles.cell, styles.head, style]} {...props}>
      <Text style={styles.headText}>{children}</Text>
    </View>
  );
}

// --- Célula do Corpo ---
function TableCell({ style, children, ...props }: TableCellProps) {
  // <td> é uma View com um Text dentro
  return (
    <View style={[styles.cell, style]} {...props}>
      <Text style={styles.cellText}>{children}</Text>
    </View>
  );
}

// --- Legenda da Tabela ---
function TableCaption({ style, ...props }: TableCaptionProps) {
  return <Text style={[styles.caption, style]} {...props} />;
}


// --- Estilos ---
const COLORS = {
  foreground: '#111827',
  mutedForeground: '#6B7280',
  border: '#E5E7EB',
  muted: '#F1F5F9', // Cor de fundo para hover/selected
};

const styles = StyleSheet.create({
  table: {
    minWidth: '100%', // Garante que a tabela ocupe pelo menos toda a largura
  },
  footer: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  cell: {
    padding: 12,
    justifyContent: 'center',
  },
  head: {
    height: 48,
  },
  headText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.mutedForeground,
  },
  cellText: {
    fontSize: 14,
    color: COLORS.foreground,
  },
  caption: {
    marginTop: 16,
    fontSize: 14,
    color: COLORS.mutedForeground,
  },
});


// --- Exportações ---
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};