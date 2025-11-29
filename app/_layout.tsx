// app/_layout.tsx (CÓDIGO FINAL E CORRIGIDO DE VAZAMENTO)

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

// CORREÇÃO: Usando caminho relativo correto para theme
import { theme } from '../constants/theme';
import { ThemeProvider } from '../hooks/useTheme';


// Impede que a tela de splash seja oculta enquanto as fontes carregam
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'KonkhmerSleokchher-Regular': require('../assets/fonts/KonkhmerSleokchher-Regular.ttf'),
    'AROneSans-Regular': require('../assets/fonts/AROneSans-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; 
  }
  
  return (
    // CORREÇÃO FINAL: View raiz com fundo CLARO que cobre 100%
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ThemeProvider> 
        <Stack
          screenOptions={{ 
            headerShown: false,
            // Força o fundo CLARO no container de conteúdo do Stack
            contentStyle: { backgroundColor: theme.colors.background } 
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </ThemeProvider>
      
      {/* StatusBar: Usando 'dark' para ícones no topo (já que o Header é escuro) */}
      {/* O backgroundColor deve ser transparente, pois o header do React Native é renderizado por baixo */}
      <StatusBar style="light" backgroundColor={theme.colors.secondary} translucent={false} /> 
    </View>
  );
}