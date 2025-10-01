import { useWindowDimensions } from 'react-native';

const MOBILE_BREAKPOINT = 768; // O mesmo ponto de quebra da versão web

/**
 * Um hook customizado que retorna 'true' se a largura da tela for
 * menor que o ponto de quebra definido para mobile (768px).
 */
export function useIsMobile(): boolean {
  // 1. Obtém a largura atual da janela do dispositivo
  const { width } = useWindowDimensions();

  // 2. Retorna true se a largura for menor que o nosso breakpoint
  return width < MOBILE_BREAKPOINT;
}