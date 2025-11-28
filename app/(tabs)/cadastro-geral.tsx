import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router } from 'expo-router';
// Importa o novo CustomHeader e o CategoryCard (renomeado para CadastroCard para contexto)
import CustomHeader from '@/components/CustomHeader';
import CategoryCard from '@/components/CategoryCard'; // Reutilizando CategoryCard

const cadastroOptions = [
  { name: 'Clientes', icon: 'person.fill', description: 'Gerenciar clientes e contatos.', route: 'clientes' },
  { name: 'Fornecedores', icon: 'truck.box.fill', description: 'Cadastro de fornecedores de insumos.', route: 'fornecedores' },
  { name: 'Funcionários', icon: 'figure.walk', description: 'Dados e acesso de colaboradores.', route: 'funcionarios' },
  { name: 'Veículos/Máquinas', icon: 'tractor.fill', description: 'Registro de maquinário agrícola.', route: 'maquinas' },
  { name: 'Produtos/Colheita', icon: 'cart.fill', description: 'Itens de venda e estoque.', route: 'produtos' },
];

export default function CadastroGeralScreen() {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={styles.container}>
      
      {/* 1. HEADER REPLICADO COM TÍTULO DO APP */}
      <CustomHeader 
        title="AGROSYS" // Título do app no Header
        showMenuIcon={true}
        showNotifications={true}
      />

      {/* 2. Conteúdo Principal da Tela */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <ThemedText type="title" style={styles.pageTitle} lightColor={primaryColor} darkColor={primaryColor}>
          Cadastros Gerais
        </ThemedText>
        <ThemedText type="default" style={styles.pageSubtitle}>
          Gerencie todos os dados base do sistema aqui.
        </ThemedText>

        <ThemedView style={styles.cardContainer}>
          {cadastroOptions.map((item) => (
            <CategoryCard 
              key={item.name} 
              icon={item.icon} 
              title={item.name}
              subtitle={item.description}
              // Roteamento de exemplo, você precisará criar as sub-rotas
              onPress={() => router.push(`/${item.route}` as any)} 
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