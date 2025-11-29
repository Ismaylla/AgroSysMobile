// src/components/ui/PageTitle.tsx

import React from 'react';
import { StyleSheet, TextProps, View } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Text } from './Text'; // Importa o componente Text que você acabou de finalizar

// Define as props que o componente aceitará
interface PageTitleProps extends TextProps {
  title: string;
  subtitle?: string; // Opcional, para o subtítulo
}

/**
 * Componente para Títulos e Subtítulos de Tela.
 * Garante que o Heading (32px) e o Subheading (14px) do Design System sejam aplicados.
 */
export function PageTitle({ title, subtitle, style, ...rest }: PageTitleProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.container}>
      {/* Título Principal - Usa a variante 'heading' (32px, Konkhmer) */}
      <Text 
        variant="heading" 
        color="primary" // Usa a cor verde primária
        style={styles.title}
        {...rest}
      >
        {title}
      </Text>

      {/* Subtítulo - Usa a variante 'caption' (14px, AR One Sans) */}
      {subtitle && (
        <Text 
          variant="caption" 
          color="primary" 
          style={styles.subtitle}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

// Estilos de layout
const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Margem abaixo do título para separar o conteúdo
    alignSelf: 'flex-start', // Garante que o container se ajuste ao texto
    paddingHorizontal: 16, // Padding padrão para não colar nas bordas da tela
  },
  title: {
    // Estilos específicos para o título, se necessário, mas a variante já faz a maior parte
  },
  subtitle: {
    // Estilos específicos para o subtítulo
    marginTop: 2,
    opacity: 0.7,
  }
});