/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2C3E50'; // Cor primária escura para texto/ícones ativos
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    // Cores base
    text: '#11181C',
    background: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E2E8F0',
    
    // Cores de Ação e Feedback
    primary: '#2C3E50',
    secondary: '#F39C12',
    accent: '#18BC9C',
    destructive: '#E74C3C',

    // Cores de Texto Específicas
    primaryForeground: '#FFFFFF', // Texto sobre um fundo 'primary'
    mutedText: '#6B7280',

    // Cores para a Tab Bar
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    // Cores base
    text: '#ECEDEE',
    background: '#151718',
    card: '#252A31',
    border: '#3A3F4A',
    
    // Cores de Ação e Feedback
    primary: '#5D89B3', // Um azul mais claro para o modo escuro
    secondary: '#F39C12',
    accent: '#18BC9C',
    destructive: '#EF4444',

    // Cores de Texto Específicas
    primaryForeground: '#FFFFFF',
    mutedText: '#9BA1A6',

    // Cores para a Tab Bar
    tint: tintColorDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};