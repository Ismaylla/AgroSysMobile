// constants/theme.ts (Código FINAL, Corrigido e Completo para a Pessoa 1)


// --- PALETA DE CORES AGROSYS (Tokens Base) ---
const AGROSYS_COLORS = {
  // Primárias (Verde)
  primary: '#1B5E1F',
  primaryDark: '#0A400D', 
  
  // Neutras / Escala de Cinza
  textDefault: '#282424', 
  backgroundLight: '#F0F4E9', 
  white: '#FFFFFF',
  
  // Níveis de Cinza (Onde estava o erro, agora exposto separadamente)
  gray: {
    '100': '#E1E3D7', 
    '300': '#C2CADAD', 
    '500': '#BDBDBD', 
    '700': '#8E8E93', 
  },

  // Semânticas
  success: '#34A853', 
  error: '#FF0000',
};


// --- CORES (Tokens Mapeados para Light/Dark Mode) ---
// Note: 'gray' não é aninhado aqui para simplificar a tipagem do Colors.
export const Colors = {
  light: {
    // Cores Principais
    primary: AGROSYS_COLORS.primary,
    secondary: AGROSYS_COLORS.primaryDark,
    success: AGROSYS_COLORS.success,
    error: AGROSYS_COLORS.error,

    // Neutras
    text: AGROSYS_COLORS.textDefault,
    background: AGROSYS_COLORS.backgroundLight,
    card: AGROSYS_COLORS.gray['100'],
    border: AGROSYS_COLORS.gray['500'],
    
    // Essencial para a tipagem:
    white: AGROSYS_COLORS.white,
    
    // Tokens Específicos do Expo
    tint: AGROSYS_COLORS.primary,
    icon: AGROSYS_COLORS.textDefault,
    tabIconDefault: AGROSYS_COLORS.gray['700'], 
    tabIconSelected: AGROSYS_COLORS.primary,
  },
  dark: {
    // Cores Principais
    primary: AGROSYS_COLORS.primary,
    secondary: AGROSYS_COLORS.primaryDark,
    success: AGROSYS_COLORS.success,
    error: AGROSYS_COLORS.error,
    
    // Neutras
    text: AGROSYS_COLORS.white,
    background: AGROSYS_COLORS.primaryDark, 
    card: AGROSYS_COLORS.primaryDark,
    border: AGROSYS_COLORS.gray['500'],
    
    // Essencial para a tipagem:
    white: AGROSYS_COLORS.white,

    // Tokens Específicos do Expo
    tint: AGROSYS_COLORS.white,
    icon: AGROSYS_COLORS.gray['300'],
    tabIconDefault: AGROSYS_COLORS.gray['500'], 
    tabIconSelected: AGROSYS_COLORS.white,
  },
};


// --- TIPOGRAFIA (Tamanhos, Pesos e Famílias) ---
export const fontSizes = {
  xxl: 48,
  xl: 32,
  lg: 20,
  md: 14, 
  sm: 14, 
};

export const fontWeights = {
  regular: '400',
  bold: '700',
};

// Nomes das fontes carregadas no useFonts (no _layout.tsx)
export const fontFamilies = {
  primary: 'KonkhmerSleokchher-Regular',
  secondary: 'AROneSans-Regular',
};


// --- ESPAÇAMENTO (Baseado na regra de 28px) ---
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16, 
  lg: 28, 
  xl: 40, 
};


// --- EXPORTAÇÃO PRINCIPAL (Para o Hook) ---
export const theme = {
    colors: Colors.light, 
    // CORREÇÃO FINAL: Expor o objeto 'gray' separadamente
    gray: AGROSYS_COLORS.gray, 
    fontSizes,
    fontWeights,
    fontFamilies,
    spacing,
};

// Exporta o tipo do tema para uso em TypeScript
export type Theme = typeof theme;