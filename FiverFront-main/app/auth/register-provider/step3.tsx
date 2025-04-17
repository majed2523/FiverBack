'use client';

import { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { registerProvider } from '@/lib/api/auth';

export default function RegisterProviderStep3() {
  const params = useLocalSearchParams();
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!bio) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);

      // Prepare data from all steps
      const providerData = {
        email: params.email as string,
        password: params.password as string,
        CIN: params.CIN as string,
        location: params.location as string,
        isEnterprise: params.isEnterprise === 'true',
        bio,
      };

      await registerProvider(providerData);
      router.replace('/(provider)/dashboard' as any);
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
      <Stack.Screen options={{ title: 'Inscription Prestataire (3/3)' }} />

      <ThemedText type="title" style={styles.title}>
        Votre profil
      </ThemedText>

      <ThemedText style={styles.label}>Bio professionnelle</ThemedText>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Décrivez votre activité, vos compétences et votre expérience..."
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
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
  bioInput: {
    height: 150,
    paddingTop: 15,
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
