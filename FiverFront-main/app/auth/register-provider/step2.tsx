'use client';

import { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Switch,
  View,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RegisterProviderStep2() {
  const params = useLocalSearchParams();
  const [CIN, setCIN] = useState('');
  const [location, setLocation] = useState('');
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (!CIN || !location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Navigate to next step with all params
    router.push({
      pathname: '/auth/register-provider/step3',
      params: {
        ...params,
        CIN,
        location,
        isEnterprise: isEnterprise ? 'true' : 'false',
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Inscription Prestataire (2/3)' }} />

      <ThemedText type="title" style={styles.title}>
        Informations professionnelles
      </ThemedText>

      <ThemedText style={styles.label}>Numéro CIN</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Votre numéro CIN"
        value={CIN}
        onChangeText={setCIN}
      />

      <ThemedText style={styles.label}>Localisation</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Votre wilaya"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.switchContainer}>
        <ThemedText style={styles.label}>Entreprise</ThemedText>
        <Switch
          value={isEnterprise}
          onValueChange={setIsEnterprise}
          trackColor={{ false: '#767577', true: '#4CAF50' }}
          thumbColor={isEnterprise ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
