'use client';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { logout } from '@/lib/api/auth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ClientDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Tableau de bord client</ThemedText>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutText}>Se déconnecter</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
