import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, type SymbolViewProps, type SymbolWeight } from 'expo-symbols';
import React, { type ComponentProps } from 'react';
import { Platform, type OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// --- Mapeamento ---
// Mapeia nomes de SF Symbols para nomes de Material Icons.
type IconMapping = {
  [key in SymbolViewProps['name']]?: ComponentProps<typeof MaterialIcons>['name'];
};
export type UniversalIconName = keyof typeof MAPPING;

/**
 * Adicione seus mapeamentos de SF Symbols para Material Icons aqui.
 */
const MAPPING: IconMapping = {
  // SF Symbol Name : Material Icon Name
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'magnifyingglass': 'search',
  'map.fill': 'map',
  'person.fill': 'person',
  'gearshape.fill': 'settings',
  // Adicione outros mapeamentos conforme necessário
  'plus': 'add',
  'xmark': 'close',
  'pencil': 'edit',
  'trash.fill': 'delete',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'doc.on.doc': 'content-copy',
};

// --- Props do Componente ---
import { ViewStyle } from 'react-native';

type UniversalIconProps = {
  /** O nome do ícone, baseado na nomenclatura dos SF Symbols. */
  name: UniversalIconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
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
  // 1. Renderiza SF Symbol no iOS
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name}
        tintColor={color}
        weight={weight}
        style={[{ width: size, height: size }, style as any]}
        resizeMode="scaleAspectFit"
      />
    );
  }

  // 2. Fallback para Android e Web
  const materialIconName = MAPPING[name];

  if (!materialIconName) {
    console.warn(`[UniversalIcon] O mapeamento para o ícone "${name}" não foi encontrado.`);
    return <MaterialIcons name="help-outline" size={size} color={color as string} style={style} />;
  }

  return (
    <MaterialIcons
      name={materialIconName}
      size={size}
      color={color as string}
      style={style}
    />
  );
}