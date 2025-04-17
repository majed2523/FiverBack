'use client';

import { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RegisterProviderStep1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Store data in params and navigate to next step
    router.push({
      pathname: '/auth/register-provider/step2',
      params: { email, password },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Inscription Prestataire (1/3)' }} />

      <ThemedText type="title" style={styles.title}>
        Créer votre compte
      </ThemedText>

      <ThemedText style={styles.label}>Email</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Votre adresse email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <ThemedText style={styles.label}>Mot de passe</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Choisir un mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <ThemedText style={styles.label}>Confirmation du mot de passe</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Confirmer votre mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>Suivant</ThemedText>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
        <ThemedText style={styles.backLinkText}>Retour</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#4CAF50',
  },
});
