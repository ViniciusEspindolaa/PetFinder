import * as icons from 'lucide-react-native';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// Helper para converter o nome do ícone para o formato PascalCase (ex: 'circle-user' -> 'CircleUser')
const toPascalCase = (str: string) => {
  return str.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase());
};

type IconName = keyof typeof icons;

export function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  const PascalCaseName = toPascalCase(name);
  const LucideIcon = (icons as any)[PascalCaseName];

  if (!LucideIcon) {
    // Retorna um ícone padrão ou nulo se o nome for inválido
    console.warn(`Ícone "${name}" não encontrado em lucide-react-native.`);
    return null; 
  }

  return <LucideIcon color={color} size={size} style={style} />;
}