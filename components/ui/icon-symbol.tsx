import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, type SymbolViewProps, type SymbolWeight } from 'expo-symbols';
import React, { type ComponentProps } from 'react';
import { Platform, type OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// --- Mapeamento ---
// Mapeia nomes de SF Symbols para nomes de Material Icons.
type IconMapping = Partial<Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>>;
export type UniversalIconName = keyof typeof MAPPING;

/**
 * Adicione seus mapeamentos de SF Symbols para Material Icons aqui.
 * - Ícones Materiais: https://icons.expo.fyi
 * - SF Symbols: App SF Symbols da Apple
 */
const MAPPING: IconMapping = {
  // SF Symbol Name : Material Icon Name
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'trash.fill': 'delete',
  'pencil': 'edit',
  'gearshape.fill': 'settings',
  'person.fill': 'person',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'plus': 'add',
  'xmark': 'close',
  'magnifyingglass': 'search',
  'doc.on.doc': 'content-copy',
};

// --- Props do Componente ---
import { ViewStyle } from 'react-native';

type UniversalIconProps = {
  /** O nome do ícone, baseado na nomenclatura dos SF Symbols. */
  name: UniversalIconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  /** O peso da fonte do ícone (apenas para iOS). */
  weight?: SymbolWeight;
};

// --- Componente Principal ---
export function UniversalIcon({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: UniversalIconProps) {
  // 1. Verifica se a plataforma é iOS
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name}
        tintColor={color}
        weight={weight}
        style={[{ width: size, height: size }, style]}
        resizeMode="scaleAspectFit"
      />
    );
  }

  // 2. Fallback para Android e Web
  const materialIconName = MAPPING[name];

  // 3. Lida com casos onde o mapeamento não foi encontrado
  if (!materialIconName) {
    console.warn(`[UniversalIcon] O mapeamento para o ícone "${name}" não foi encontrado. Usando um ícone de fallback.`);
    return (
      <MaterialIcons
        name="help-outline" // Um ícone de fallback seguro
        size={size}
        color={color as string}
        style={style as StyleProp<TextStyle>}
      />
    );
  }
  return (
    <MaterialIcons
      name={materialIconName}
      size={size}
      color={color as string}
      style={style as StyleProp<TextStyle>}
    />
  );
}