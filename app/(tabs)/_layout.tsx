import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
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
        tabBarStyle: {
          height: 90, 
          paddingBottom: 25, 
          paddingTop: 10, 
        },
      }}>
      
      {/* 1. HOME (Mantido) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* 2. UAPS (Icone ajustado para 'map') */}
      <Tabs.Screen
        name="uaps"
        options={{
          title: 'UAPs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map" color={color} />,
        }}
      />
      
      {/* 3. FERRAMENTAS (Icone ajustado para 'hammer') */}
      <Tabs.Screen
        name="ferramentas"
        options={{
          title: 'Ferramentas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hammer" color={color} />,
        }}
      />
      
      {/* 4. INSUMOS (Icone ajustado para 'leaf.fill' - Se falhar, use 'leaf') */}
      <Tabs.Screen
        name="insumos"
        options={{
          title: 'Insumos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="leaf.fill" color={color} />,
        }}
      />
      
      {/* 5. CADASTRO GERAL (Icone ajustado para 'list.bullet.rectangle') */}
      <Tabs.Screen
        name="cadastro-geral"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet.rectangle" color={color} />,
        }}
      />
      
      {/* Oculta o placeholder 'explore' */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null, 
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}