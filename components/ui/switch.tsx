import React from 'react';
import {
  Switch as RNSwitch,
  type SwitchProps,
  StyleSheet,
  Platform,
} from 'react-native';

// --- Tipos e Cores ---
type CustomSwitchProps = SwitchProps;

const COLORS = {
  primary: '#2C3E50', // Cor para o estado 'ligado'
  muted: '#E5E7EB',   // Cor para o estado 'desligado'
  thumb: '#FFFFFF',    // Cor do "polegar"
};

// --- Componente Principal: Switch ---
function Switch({ value, ...props }: CustomSwitchProps) {
  return (
    <RNSwitch
      // Cores da trilha (fundo)
      trackColor={{ false: COLORS.muted, true: COLORS.primary }}
      // Cor do "polegar" (a bolinha)
      thumbColor={value ? COLORS.thumb : COLORS.thumb}
      // No iOS, a cor de fundo da trilha quando desligada precisa ser definida aqui
      ios_backgroundColor={COLORS.muted}
      // A prop 'value' controla se o switch está ligado ou desligado
      value={value}
      {...props}
    />
  );
}

// --- Exportações ---
export { Switch };