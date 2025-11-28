import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
// Importa componentes de tema e utilitários
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
// Importa o novo CustomHeader e o CategoryCard
import CustomHeader from '@/components/CustomHeader';
import CategoryCard from '@/components/CategoryCard';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'tint'); 

  const dashboardCategories = [
    { 
      id: 1, 
      icon: 'map.fill', // SF Symbol para UAPs
      title: 'Minhas UAPs', 
      subtitle: 'Gerencie áreas de cultivo, mapas e insumos.',
      route: '/(tabs)/uaps' 
    },
    { 
      id: 2, 
      icon: 'leaf.fill', // SF Symbol para Insumos
      title: 'Estoque de Insumos', 
      subtitle: 'Controle de sementes, fertilizantes e defensivos.',
      route: '/(tabs)/insumos' 
    },
    { 
      id: 3, 
      icon: 'hammer.fill', // SF Symbol para Ferramentas
      title: 'Ferramentas de Campo', 
      subtitle: 'Acesso rápido a cálculos e utilitários.',
      route: '/(tabs)/ferramentas' 
    },
    { 
      id: 4, 
      icon: 'list.bullet.rectangle', // SF Symbol para Cadastro Geral
      title: 'Cadastros Gerais', 
      subtitle: 'Clientes, fornecedores, funcionários e produtos.',
      route: '/(tabs)/cadastro-geral' 
    },
  ];

  return (
    <ThemedView style={styles.container}>
      
      {/* 1. HEADER REPLICADO DO REPOSITÓRIO DE TESTE */}
      {/* Assumindo que a Home deve ter o título do app e ícones de navegação */}
      <CustomHeader 
        title="AGROSYS" 
        showMenuIcon={true} // Mostrar ícone de Menu (se usar Drawer)
        showNotifications={true} // Mostrar ícone de Notificações
      />

      {/* 2. Conteúdo Principal - Dashboard */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <ThemedText type="title" style={styles.pageTitle} lightColor={primaryColor} darkColor={primaryColor}>
          Dashboard
        </ThemedText>
        <ThemedText type="default" style={styles.pageSubtitle}>
          Visão geral e acesso rápido.
        </ThemedText>

        <ThemedView style={styles.cardContainer}>
          {dashboardCategories.map((category) => (
            <CategoryCard
              key={category.id}
              // Os ícones aqui são SF Symbols, mas o CategoryCard mapeia Ionicons se necessário.
              icon={category.icon} 
              title={category.title}
              subtitle={category.subtitle}
              onPress={() => router.push(category.route as any)}
            />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 14,
    marginBottom: 30,
    opacity: 0.7,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
});