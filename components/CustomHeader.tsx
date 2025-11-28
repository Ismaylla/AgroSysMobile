import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CustomHeaderProps {
  title: string;
  showMenuIcon: boolean; // Para telas que estão dentro de um Drawer Navigator
  showNotifications: boolean;
}

/**
 * Header Customizado que replica o layout do repositório de teste 
 * (Menu | Título Centralizado | Notificações) utilizando os componentes do AgroSys Mobile.
 */
export default function CustomHeader({
  title,
  showMenuIcon,
  showNotifications,
}: CustomHeaderProps) {
  const primaryColor = useThemeColor({}, 'tint');
  const navigation = useNavigation<any>(); // Usado para abrir o Drawer

  return (
    // Usa ThemedView para ter controle sobre as cores do Safe Area
    <ThemedView style={[styles.safeArea, { backgroundColor: primaryColor || '#A1CEDC' }]}>
      
      <View style={styles.headerContent}>
        
        {/* LADO ESQUERDO: Ícone de Menu (Drawer) ou Placeholder */}
        {showMenuIcon ? (
          <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()}>
            {/* Ícone SF Symbol para Menu (adaptado de 'menu' do Ionicons) */}
            <IconSymbol name="list.bullet" size={30} color="#FFFFFF" /> 
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} /> // Placeholder para manter o alinhamento central
        )}

        {/* CENTRO: TÍTULO DA APLICAÇÃO */}
        <ThemedText
          type="title"
          lightColor="#FFFFFF"
          darkColor="#FFFFFF"
          style={styles.headerTitle}
        >
          {title}
        </ThemedText>

        {/* LADO DIREITO: Ícone de Notificações ou Placeholder */}
        {showNotifications ? (
          // Link para a modal de notificações (assumindo rota '/modal')
          <Link href={'/modal'} asChild>
            <TouchableOpacity>
              {/* Ícone SF Symbol para Notificações (adaptado de 'notifications-outline' do Ionicons) */}
              <IconSymbol name="bell" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </Link>
        ) : (
          <View style={styles.iconPlaceholder} /> // Placeholder para manter o alinhamento central
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    // Garante que o conteúdo fique abaixo da barra de status no iOS/Android, 
    // replicando o uso do SafeAreaView do repositório de teste.
    paddingTop: Platform.OS === 'android' ? 40 : 0, 
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Borda de destaque sutil
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50, // Altura fixa para consistência
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // Centralização absoluta para garantir que fique no centro, independentemente dos ícones laterais
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  iconPlaceholder: {
    width: 30, // Largura dos ícones laterais
    height: 30,
  }
});