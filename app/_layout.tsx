// app/_layout.tsx

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Importa o seu ThemeProvider customizado que injeta os tokens do AgroSys
import { ThemeProvider } from '../hooks/useTheme';

// Impede que a tela de splash seja oculta enquanto as fontes carregam
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  // 1. CARREGAMENTO DAS FONTES AGROSYS (Implementação da Pessoa 1)
  const [fontsLoaded, fontError] = useFonts({
    'KonkhmerSleokchher-Regular': require('../assets/fonts/KonkhmerSleokchher-Regular.ttf'),
    'AROneSans-Regular': require('../assets/fonts/AROneSans-Regular.ttf'),
  });

  // 2. Lógica para esconder a tela de splash
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Mantém a splash screen
  }
  
  // O hook useColorScheme() original e o ThemeProvider do React Navigation
  // foram removidos, pois seu ThemeProvider customizado faz o trabalho.
  
  return (
    // 3. ENVOLVE A NAVEGAÇÃO COM O SEU ThemeProvider PERSONALIZADO
    <ThemeProvider> 
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}