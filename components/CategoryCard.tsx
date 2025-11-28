import React from 'react';
// 💡 CORREÇÃO: Adicionamos 'Platform' à importação do 'react-native'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'; 
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router } from 'expo-router';

// Usamos as props que o código de exemplo do usuário sugeriu
interface CategoryCardProps {
  icon: string; // Nome do ícone (Ionicons ou SF Symbol)
  title: string;
  subtitle: string;
  onPress: () => void;
}

/**
 * Componente de cartão reutilizável para o Dashboard.
 * Adapta os nomes de ícones do Ionicons (usados no código de exemplo) para SF Symbols, 
 * que são usados pelo componente IconSymbol.
 */
export default function CategoryCard({ icon, title, subtitle, onPress }: CategoryCardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const cardBackgroundColor = useThemeColor({}, 'cardBackground' as any) || 'rgba(128, 128, 128, 0.05)';

  // Mapeamento simples de Ionicons para SF Symbols para garantir que IconSymbol funcione.
  // Exemplo: 'leaf-outline' -> 'leaf.fill' ou 'leaf'
  const sfSymbolName = icon
    .replace('-outline', '.fill')
    .replace('leaf', 'leaf.fill')
    .replace('cube', 'cube.fill')
    .replace('aperture', 'map.fill'); 

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBackgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ThemedView style={styles.iconBackground}>
        {/* Usamos 'as any' aqui para resolver o erro de tipagem SFSymbols6_0,
            já que o nome do ícone vem de uma string dinâmica. */}
        <IconSymbol size={30} name={sfSymbolName as any} color={tintColor} />
      </ThemedView>
      <ThemedView style={styles.cardContent}>
        <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      </ThemedView>
      <IconSymbol size={20} name="chevron.right" color={tintColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    // Estilos de sombra unificados por plataforma (para replicar o visual)
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  iconBackground: {
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: 'rgba(0, 150, 0, 0.1)', // Fundo sutil para o ícone
  },
  cardContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.8,
  }
});