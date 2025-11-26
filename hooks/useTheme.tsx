// hooks/useTheme.ts

// 1. CORREÇÃO: Importar React e o tipo PropsWithChildren para tipar a função corretamente.
import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

// Importa os tokens de design que você definiu em constants/theme
import { Colors, theme as defaultTheme, Theme } from '../constants/theme';


// 1. Cria o Contexto (Valor padrão é o tema light)
const ThemeContext = createContext<Theme>(defaultTheme);

// 2. Provedor de Tema (ThemeProvider)
// Usa PropsWithChildren para tipar as props, resolvendo o erro de sintaxe/tipagem.
export function ThemeProvider({ children }: PropsWithChildren) {
  // Detecta o tema do sistema (light ou dark)
  const colorScheme = useColorScheme();
  
  // Usa useMemo para calcular o objeto de tema apenas quando o 'colorScheme' mudar.
  const theme = useMemo(() => {
    // Escolhe a paleta de cores correta baseada na detecção do sistema
    const colorPalette = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return {
      // Mantém os tokens estáticos (spacing, fonts, weights)
      ...defaultTheme,
      // Sobrescreve apenas as cores com a paleta dinâmica
      colors: colorPalette, 
    };
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook Personalizado para componentes
// Este é o hook que todos os outros desenvolvedores (Pessoa 2, 3, 4) irão usar.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}