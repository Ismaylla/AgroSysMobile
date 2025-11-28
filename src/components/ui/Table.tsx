// src/components/ui/Table.tsx (CÓDIGO FINAL E CORRIGIDO)

import React from 'react';
import { Pressable, StyleSheet, TextStyle, View, ViewProps } from 'react-native';
// 1. Não precisa mais importar 'Colors' de fora, pois 'gray' agora está no useTheme!
import { useTheme } from '../../../hooks/useTheme';
import { Card } from './Card';
import { Text } from './Text';

// --- 1. Subcomponente: Linha da Tabela (Table.Row) ---

interface TableRowProps extends ViewProps {
  onPress?: () => void;
  isHeader?: boolean;
  children: React.ReactNode;
}

function TableRow({ onPress, isHeader = false, children, style, ...rest }: TableRowProps) {
  // CORREÇÃO: Acessa os tokens de cor, espaçamento, tipografia E o objeto 'gray' diretamente do hook!
  const { colors, spacing, fontWeights, fontFamilies, fontSizes, gray } = useTheme();

  // Valor do cinza claro para o cabeçalho (acessando a paleta de gray exposta)
  const headerGray = gray['300'];

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border, 
      // Usando a variável headerGray que é um token de cor
      backgroundColor: isHeader ? headerGray : colors.white, 
    },
    headerText: {
      // Usando 'as TextStyle['fontWeight']' para resolver o conflito de tipagem de string
      fontWeight: fontWeights.bold as TextStyle['fontWeight'], 
      color: colors.text,
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes.md,
    },
  });

  // Usando Pressable para ser mais eficiente
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper style={[styles.row, style]} onPress={onPress} {...rest}>
      {children}
    </Wrapper>
  );
}

// --- 2. Subcomponente: Célula da Tabela (Table.Cell) ---

interface TableCellProps extends ViewProps {
  flex?: number; 
  children: React.ReactNode;
}

function TableCell({ flex = 1, children, style, ...rest }: TableCellProps) {
  const processedChildren = React.Children.map(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <Text variant="caption">{child}</Text>; 
    }
    return child;
  });

  const styles = StyleSheet.create({
    cell: {
      flex: flex,
      justifyContent: 'center',
      paddingHorizontal: 4, 
    },
  });

  return (
    <View style={[styles.cell, style]} {...rest}>
      {processedChildren}
    </View>
  );
}

// --- 3. Componente Principal: Tabela ---

interface TableProps extends ViewProps {
  children: React.ReactNode;
}

export function Table({ children, style, ...rest }: TableProps) {
  return (
    // Reutiliza o Card que você já criou para ter sombra e bordas
    <Card style={[{ padding: 0, overflow: 'hidden' }, style]} {...rest}>
      {children}
    </Card>
  );
}

// Exporta os subcomponentes como propriedades da Tabela
Table.Row = TableRow;
Table.Cell = TableCell;