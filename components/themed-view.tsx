import { View, type ViewProps } from 'react-native';

// As props são agora as mesmas de uma View padrão.
export type CustomViewProps = ViewProps;

export function CustomView({ style, ...otherProps }: CustomViewProps) {
  // A lógica de cor via hook foi removida.
  // O componente agora simplesmente renderiza uma View com os estilos e props recebidos.
  return <View style={style} {...otherProps} />;
}