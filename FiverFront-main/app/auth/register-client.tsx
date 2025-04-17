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
import { registerClient } from '@/lib/api/auth';

export default function RegisterClientScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      await registerClient({
        firstName,
        lastName,
        email,
        password,
      });

      router.replace('/(client)/dashboard' as any);
    } catch (error) {
      Alert.alert(
        "Erreur d'inscription",
        "Une erreur est survenue lors de l'inscription"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Inscription Client' }} />

      <ThemedText type="title" style={styles.title}>
        Inscription Client
      </ThemedText>

      <ThemedText style={styles.label}>Prénom</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Votre prénom"
        value={firstName}
        onChangeText={setFirstName}
      />

      <ThemedText style={styles.label}>Nom</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Votre nom"
        value={lastName}
        onChangeText={setLastName}
      />

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
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>S'inscrire</ThemedText>
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
  backLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#0066FF',
  },
});
