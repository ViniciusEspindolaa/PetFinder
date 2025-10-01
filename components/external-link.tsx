import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';

// Definimos as propriedades que o componente aceitará
interface ExternalLinkProps extends TouchableOpacityProps {
  href: string;                  // A URL que será aberta
  children: React.ReactNode;     // O conteúdo do link (geralmente um texto)
  textStyle?: StyleProp<TextStyle>; // Estilo opcional para o texto
}

export function ExternalLink({ href, children, style, textStyle, ...rest }: ExternalLinkProps) {
  
  const handlePress = async () => {
    // Abre o link no navegador interno do app.
    // Isso evita que o usuário saia da sua aplicação.
    await openBrowserAsync(href);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style} {...rest}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}