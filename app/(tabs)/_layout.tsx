// app/(tabs)/_layout.tsx (CÓDIGO FINAL CORRIGIDO)

import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

// Componentes que já existem no seu projeto
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';


export default function TabLayout() {
  const { colors, gray } = useTheme(); 

  // Definimos o estilo da barra de abas uma única vez
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.white, 
      borderTopColor: colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
    }
  });

  return (
    <Tabs
      screenOptions={{
        // CONTENTSTYLE REMOVIDO: O fundo do conteúdo já é definido no Stack e na SafeAreaView
        
        tabBarStyle: styles.tabBar, // Aplica o estilo da barra inferior
        
        headerShown: false, 

        tabBarActiveTintColor: colors.primary, // Verde primário
        tabBarInactiveTintColor: gray['700'], // Cinza escuro para inativo
        tabBarButton: HapticTab,

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}