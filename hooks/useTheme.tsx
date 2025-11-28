// hooks/useTheme.tsx (CORRIGIDO: Removendo lógica de tema escuro para evitar vazamento)

import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
// Removendo useColorScheme para evitar vazamento de tema escuro nativo
// import { useColorScheme } from 'react-native'; 

import { Colors, theme as defaultTheme, Theme } from '../constants/theme';


// 1. Cria o Contexto
const ThemeContext = createContext<Theme>(defaultTheme);

// 2. Provedor de Tema (ThemeProvider)
export function ThemeProvider({ children }: PropsWithChildren) {
  // CORREÇÃO: Desativamos a lógica de tema dinâmico para forçar o tema CLARO
  // const colorScheme = useColorScheme(); 
  
  const theme = useMemo(() => {
    // Usamos diretamente a paleta CLARA, que tem o fundo BEGE
    const colorPalette = Colors.light; 

    return {
      ...defaultTheme,
      colors: colorPalette, 
      // Não precisamos de dependências, pois o tema é estático
    };
  }, []); // Array de dependências VAZIO

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook Personalizado para componentes
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}