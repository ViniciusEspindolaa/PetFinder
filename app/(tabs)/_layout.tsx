import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
// Corrigido: Importando o ícone universal
import { UniversalIcon } from '@/components/universal-icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // Corrigido: Usando UniversalIcon com o nome do SF Symbol
          tabBarIcon: ({ color }) => (
            <UniversalIcon size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          // Corrigido: Usando UniversalIcon com o nome do SF Symbol
          tabBarIcon: ({ color }) => (
            <UniversalIcon size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      {/* Você pode adicionar suas outras abas aqui da mesma forma */}
    </Tabs>
  );
}