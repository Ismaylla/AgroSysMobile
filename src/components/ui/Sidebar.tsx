// import Feather from '@expo/vector-icons/Feather';
// import React from 'react';
// import { Pressable, StyleSheet, View, ViewProps } from 'react-native';
// import { useTheme } from '../../../hooks/useTheme';
// import { Text } from './Text';

// const SIDEBAR_WIDTH = 240; // MAIS LARGO, IGUAL AO FIGMA

// interface SidebarItemProps extends ViewProps {
//   label: string;
//   onPress: () => void;
// }

// function SidebarItem({ label, onPress, style, ...rest }: SidebarItemProps) {
//   const { colors, spacing } = useTheme();

//   const styles = StyleSheet.create({
//     item: {
//       width: 200,
//       height: 40,
//       backgroundColor: 'rgba(99, 122, 48, 0.45)', // VERDE TRANSLÚCIDO DO FIGMA
//       // alignSelf: 'flex-start',
//       justifyContent: 'center',
//       paddingLeft: spacing.md,
//       borderRadius: 4,
//       marginBottom: 28,
//     },
//     label: {
//       color: colors.white,
//       fontSize: 14,
//       fontWeight: '400', // FONTE FINA CORRETA
//     }
//   });

//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.item,
//         { opacity: pressed ? 0.7 : 1 },
//         style,
//       ]}
//       {...rest}
//     >
//       <Text style={styles.label}>{label}</Text>
//     </Pressable>
//   );
// }

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
//   const { colors, spacing } = useTheme();

//   const sidebarStyle = {
//     transform: [{ translateX: isOpen ? 0 : -SIDEBAR_WIDTH }],
//   };

//   const styles = StyleSheet.create({
//     overlay: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       zIndex: 50,
//     },
//     sidebar: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: SIDEBAR_WIDTH,
//       bottom: 0,
//       backgroundColor: colors.secondary, // VERDE FUNDO COMPLETO
//       paddingTop: 110, // exatamente como no figma
//       paddingHorizontal: spacing.lg,
//       zIndex: 100,
//     },
//     menuIcon: {
//       position: "absolute",
//       top: 70 - 30, // posição exata do header menos metade do tamanho do ícone
//       left: 16,     // mesma margem horizontal do header
//       zIndex: 200,
//     },
//   });

//   return (
//     <>
//       {isOpen && <Pressable style={styles.overlay} onPress={onClose} />}

//       <View style={[styles.sidebar, sidebarStyle]}>
//         <Feather
//           name="menu"
//           size={30}
//           color="white"
//           style={styles.menuIcon}
//           onPress={onClose}
//         />

//         {children}
//       </View>
//     </>
//   );
// }

// Sidebar.Item = SidebarItem;
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Text } from './Text';

const SIDEBAR_WIDTH = 240;

interface SidebarItemProps extends ViewProps {
  label: string;
  onPress: () => void;
}

function SidebarItem({ label, onPress, style, ...rest }: SidebarItemProps) {
  const { colors, spacing } = useTheme();

  const styles = StyleSheet.create({
    item: {
      width: 200,
      height: 40,
      backgroundColor: 'rgba(99, 122, 48, 0.45)',
      justifyContent: 'center',
      paddingLeft: spacing.md,
      borderRadius: 4,
      marginBottom: 28,
    },
    label: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '400',
    }
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        { opacity: pressed ? 0.7 : 1 },
        style,
      ]}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  const { colors, spacing } = useTheme();

  const sidebarStyle = {
    transform: [{ translateX: isOpen ? 0 : -SIDEBAR_WIDTH }],
  };

  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50,
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIDEBAR_WIDTH,
      bottom: 0,
      backgroundColor: colors.secondary,
      paddingTop: 110,
      paddingHorizontal: spacing.lg,
      zIndex: 100,
    },

    // ✅ AGORA 100% IGUAL AO HEADER
    menuIcon: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 20 : 0, // mesmo padding do header
      left: spacing.md,                   // mesma margem horizontal
      height: 70,                         // mesma altura do header
      justifyContent: 'center',
      zIndex: 200,
    },
  });

  return (
    <>
      {isOpen && <Pressable style={styles.overlay} onPress={onClose} />}

      <View style={[styles.sidebar, sidebarStyle]}>
        {/* ✅ ÍCONE PERFEITAMENTE ALINHADO COM O HEADER */}
        <View style={styles.menuIcon}>
          <Feather
            name="menu"
            size={26}          // ✅ MESMO TAMANHO DO HEADER
            color="white"
            onPress={onClose}
          />
        </View>

        {children}
      </View>
    </>
  );
}

Sidebar.Item = SidebarItem;
