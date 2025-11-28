import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router } from 'expo-router';

interface ListItemCardProps {
  title: string;
  subtitle: string;
  onPress: () => void;
  iconName: string; // Ícone principal (SF Symbol)
  statusIcon?: string; // Ícone de status/ação à direita
}

/**
 * Cartão de Item de Lista focado em listagens de cadastro (Clientes, Fornecedores, etc.).
 * Segue o padrão limpo e com borda da imagem de referência.
 */
export default function ListItemCard({
  title,
  subtitle,
  onPress,
  iconName,
  statusIcon = 'chevron.right', // Padrão é uma seta de navegação
}: ListItemCardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1F2937' }, 'background');
  const borderColor = useThemeColor({ light: '#E5E7EB', dark: '#374151' }, 'border' as any); // Assumindo uma cor de borda

  return (
    <TouchableOpacity
      style={[styles.card, { 
        backgroundColor: cardBackgroundColor,
        borderColor: borderColor, // Usando a cor de borda do tema
      }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedView style={styles.iconContainer}>
        {/* Ícone principal à esquerda */}
        <IconSymbol size={24} name={iconName as any} color={tintColor} />
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.title}>{title}</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>{subtitle}</ThemedText>
      </ThemedView>
      
      {/* Ícone de status/navegação à direita */}
      <IconSymbol size={20} name={statusIcon as any} color={tintColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1, // Borda visível como na imagem
    marginBottom: 10,
    width: '100%',
  },
  iconContainer: {
    paddingRight: 15,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.7,
  }
});