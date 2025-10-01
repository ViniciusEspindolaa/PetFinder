import { StyleSheet, Text, type TextProps } from 'react-native';

// Removemos as props lightColor e darkColor
export type CustomTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function CustomText({
  style,
  type = 'default',
  ...rest
}: CustomTextProps) {
  // A lógica de cor via hook foi removida. A cor agora é controlada pela prop 'style'.
  return (
    <Text
      style={[
        // Aplica o estilo base de acordo com o tipo
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        // Aplica qualquer estilo customizado passado via props, incluindo a cor
        style,
      ]}
      {...rest}
    />
  );
}

// Os estilos base permanecem os mesmos
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});