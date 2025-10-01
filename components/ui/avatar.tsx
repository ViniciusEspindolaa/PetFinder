import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type AvatarContextType = {
  status: 'loading' | 'loaded' | 'error';
  setStatus: React.Dispatch<React.SetStateAction<'loading' | 'loaded' | 'error'>>;
};

const AvatarContext = createContext<AvatarContextType | null>(null);

// --- Componente Raiz: Avatar ---
type AvatarProps = ViewProps;

function Avatar({ style, children, ...props }: AvatarProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // Verifica se um AvatarImage foi fornecido. Se não, vai direto para o estado de erro/fallback.
  useEffect(() => {
    const hasImage = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === AvatarImage
    );
    if (!hasImage) {
      setStatus('error');
    }
  }, [children]);

  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <View style={[styles.root, style]} {...props}>
        {children}
      </View>
    </AvatarContext.Provider>
  );
}

// --- Componente da Imagem: AvatarImage ---
type AvatarImageProps = ImageProps;

function AvatarImage(props: AvatarImageProps) {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('AvatarImage must be used within an Avatar');
  }

  const { status, setStatus } = context;

  // Não renderiza a imagem se o carregamento falhou
  if (status === 'error') {
    return null;
  }

  return (
    <Image
      style={[styles.image, { opacity: status === 'loaded' ? 1 : 0 }]} // Fade-in effect
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      {...props}
    />
  );
}

// --- Componente de Fallback: AvatarFallback ---
type AvatarFallbackProps = ViewProps;

function AvatarFallback({ style, children, ...props }: AvatarFallbackProps) {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('AvatarFallback must be used within an Avatar');
  }

  const { status } = context;

  // Renderiza o fallback apenas se a imagem estiver carregando ou se deu erro
  if (status === 'loaded') {
    return null;
  }

  return (
    <View style={[styles.fallback, style]} {...props}>
      {children}
    </View>
  );
}

// --- Estilos ---
const COLORS = {
  muted: '#E5E7EB', // Cinza claro para o fundo do fallback
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: 40,
    width: 40,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: 20, // Metade da altura/largura
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.muted,
  },
});

// --- Exportações ---
export { Avatar, AvatarImage, AvatarFallback };