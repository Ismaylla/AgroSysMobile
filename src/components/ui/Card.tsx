// src/components/ui/Card.tsx

import React from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

interface CardProps extends ViewProps {
  style?: ViewProps['style'];
}

/**
 * Componente base para Contêineres Sombreados (Cards).
 * Usa os tokens de cores, espaçamento e a sombra exata do Figma (Raio 5px).
 */
export function Card({ children, style, ...rest }: CardProps) {
  const { colors, spacing } = useTheme();

  // 1. Definição da sombra exata do Figma
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.25, // 25% de opacidade
      shadowRadius: 4, 
    },
    android: {
      elevation: 5, 
    },
  });

  const baseStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.card, // #E1E3D7
      
      // 2. Raio da Borda (5px)
      borderRadius: 5, 
      
      // Padding interno (spacing.md = 16px)
      padding: spacing.md, 
      
      // Aplica a sombra
      ...shadowStyle,
      
      // Margem inferior padrão para separar cards
      marginBottom: spacing.md,
    },
  });

  return (
    <View style={[baseStyles.card, style]} {...rest}>
      {children}
    </View>
  );
}