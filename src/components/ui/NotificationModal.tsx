// src/components/ui/NotificationModal.tsx

import React, { useEffect } from 'react';
import { Modal, Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationModalProps {
  isVisible: boolean;
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number; // Tempo em milissegundos para fechar automaticamente
}

/**
 * Modal de Notificação (Toast/Alerta) usando tokens semânticos.
 */
export function NotificationModal({ 
  isVisible, 
  message, 
  type, 
  onClose, 
  duration = 3000 
}: NotificationModalProps) {
  const { colors, spacing } = useTheme();

  // Fecha automaticamente após a duração definida
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // Define a cor de fundo com base no tipo
  const backgroundColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'info':
      default:
        return colors.tint; // Cor primária como info
    }
  };

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 40 : 10,
    },
    modalView: {
      margin: spacing.md,
      backgroundColor: backgroundColor(type), // Cor dinâmica
      borderRadius: 5,
      padding: spacing.lg,
      alignItems: 'center',
      ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, },
        android: { elevation: 5, },
      }),
      width: '90%',
    },
    textStyle: {
      color: colors.white, // Texto branco para contraste
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}