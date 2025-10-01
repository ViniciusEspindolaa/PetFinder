import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { Button } from './button'; // Importe o seu componente Button customizado

// --- Componentes de Layout ---
function Pagination({ style, ...props }: ViewProps) {
  return <View style={[styles.container, style]} {...props} />;
}

function PaginationContent({ style, ...props }: ViewProps) {
  return <View style={[styles.content, style]} {...props} />;
}

// O PaginationItem é opcional no React Native, mas mantemos para consistência da API
function PaginationItem({ style, ...props }: ViewProps) {
  return <View style={style} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Button>;

function PaginationLink({ isActive, children, ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size="icon"
      {...props}
    >
      {children}
    </Button>
  );
}


// --- Botões de Navegação ---
function PaginationPrevious(props: React.ComponentProps<typeof Button>) {
  return (
    <Button size="default" variant="ghost" {...props}>
      <ChevronLeft />
      <Text>Anterior</Text>
    </Button>
  );
}

function PaginationNext(props: React.ComponentProps<typeof Button>) {
  return (
    <Button size="default" variant="ghost" {...props}>
      <Text>Próximo</Text>
      <ChevronRight />
    </Button>
  );
}


// --- Elipse (...) ---
function PaginationEllipsis() {
  return (
    <View style={styles.ellipsisContainer}>
      <MoreHorizontal size={18} color={COLORS.mutedText} />
    </View>
  );
}


// --- Estilos ---
const COLORS = {
  mutedText: '#7F8C8D',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ellipsisContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// --- Exportações ---
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};