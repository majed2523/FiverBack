'use client';

import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { loginUser } from '@/lib/api/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Veuillez saisir votre email et mot de passe');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await loginUser({ email, password });

      // Handle the response based on the role
      if (response.role === 'CLIENT') {
        router.replace('/(client)/dashboard' as any);
      } else if (response.role === 'PROVIDER') {
        router.replace('/(provider)/dashboard' as any);
      } else {
        setErrorMessage('Rôle utilisateur inconnu');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Email ou mot de passe incorrect');
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Connexion' }} />

      <ThemedText type="title" style={styles.title}>
        Connexion
      </ThemedText>

      {errorMessage && (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(null);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrorMessage(null);
        }}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>Se connecter</ThemedText>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <ThemedText>Pas encore de compte ? </ThemedText>
        <TouchableOpacity
          onPress={() => router.push('/auth/register-type' as any)}
        >
          <ThemedText style={styles.registerLink}>S'inscrire</ThemedText>
        </TouchableOpacity>
      </View>
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
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0066FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: '#0066FF',
    fontWeight: 'bold',
  },
});
