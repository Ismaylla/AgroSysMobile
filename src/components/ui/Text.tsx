// src/components/ui/Text.tsx (CÓDIGO FINAL E CORRIGIDO)

import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

// CORREÇÃO 1: Define o tipo do retorno do useTheme para uso nas props
type ThemeColors = ReturnType<typeof useTheme>['colors'];

type TextVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'button';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  // CORREÇÃO 1 APLICADA: Usa a chave do objeto 'colors' retornado
  color?: keyof ThemeColors; 
  style?: TextProps['style'];
}

/**
 * Componente base para texto.
 */
export function Text({ variant = 'body', color, style, ...rest }: CustomTextProps) {
  const { colors, fontSizes, fontFamilies, fontWeights } = useTheme();

  // CORREÇÃO 2: Define o tipo de retorno como TextStyle, permitindo que o TypeScript
  // lide corretamente com a tipagem de fontWeight.
  const getTextStyle = (): TextStyle => { 
    switch (variant) {
      case 'heading':
        return { 
          fontSize: fontSizes.xl, 
          fontFamily: fontFamilies.primary, 
          fontWeight: fontWeights.regular as TextStyle['fontWeight'] // Casting para garantir o tipo
        };
      case 'subheading':
        return { 
          fontSize: fontSizes.lg, 
          fontFamily: fontFamilies.primary, 
          fontWeight: fontWeights.regular as TextStyle['fontWeight']
        };
      case 'button':
        return { 
          fontSize: fontSizes.md, 
          fontFamily: fontFamilies.secondary, 
          fontWeight: fontWeights.bold as TextStyle['fontWeight']
        };
      case 'caption':
        return { 
          fontSize: fontSizes.sm, 
          fontFamily: fontFamilies.secondary, 
          fontWeight: fontWeights.regular as TextStyle['fontWeight']
        };
      case 'body':
      default:
        return { 
          fontSize: fontSizes.md, 
          fontFamily: fontFamilies.secondary, 
          fontWeight: fontWeights.regular as TextStyle['fontWeight']
        };
    }
  };

  // Define a cor. Se 'color' for passado, usa o token. Caso contrário, usa o texto padrão.
  // Garante que colors[color] é acessível, mesmo se o 'color' for undefined
  const finalColor = color ? colors[color as keyof ThemeColors] : colors.text;

  return (
    <RNText 
      style={[
        getTextStyle(), 
        { color: finalColor }, 
        style 
      ]} 
      {...rest}
    />
  );
}