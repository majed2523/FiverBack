'use client';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RegisterTypeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Inscription' }} />

      <ThemedText type="title" style={styles.title}>
        Je souhaite m'inscrire en tant que :
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/auth/register-client' as any)}
      >
        <ThemedText style={styles.buttonText}>Client</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.providerButton]}
        onPress={() => router.push('/auth/register-provider/step1' as any)}
      >
        <ThemedText style={styles.buttonText}>Prestataire</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
        <ThemedText style={styles.backLinkText}>
          Retour à la connexion
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066FF',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  providerButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#0066FF',
  },
});
