import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
// Componentes de Layout
import CustomHeader from '@/components/CustomHeader';

export default function InsumosScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  
  return (
    <ThemedView style={styles.container}>
      
      {/* HEADER: Layout padrão do repositório de teste */}
      <CustomHeader 
        title="AGROSYS" 
        showMenuIcon={true} 
        showNotifications={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.pageTitle} lightColor={primaryColor} darkColor={primaryColor}>
          Insumos
        </ThemedText>
        <ThemedText type="default" style={styles.pageSubtitle}>
          Controle de estoque, aplicação e fornecedores.
        </ThemedText>
        
        <ThemedView style={styles.placeholder}>
          <ThemedText>Lista de Cards de Insumos (fertilizantes, sementes, defensivos).</ThemedText>
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
  placeholder: {
    width: '100%',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  }
});