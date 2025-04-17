'use client';

import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { logout } from '@/lib/api/auth';
import { LogOut, Menu } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
}

export function Header({ title, showMenu = false, onMenuPress }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login' as any);
  };

  return (
    <View style={styles.header}>
      {showMenu ? (
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Menu size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <ThemedText style={styles.title}>{title}</ThemedText>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    padding: 4,
  },
  logoutButton: {
    padding: 4,
  },
  placeholder: {
    width: 28,
  },
});
