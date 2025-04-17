'use client';

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { getCurrentUser } from '@/lib/api/auth';

export default function ProviderProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Form state
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [specialties, setSpecialties] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);

        // Initialize form with user data
        if (userData?.provider) {
          setBio(userData.provider.bio || '');
          setLocation(userData.provider.location || '');
          setPhone(userData.provider.phone || '');
          setSpecialties(userData.provider.specialties || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Erreur', 'Impossible de charger les données du profil');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);

      // This would be an API call to update the profile
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert('Succès', 'Votre profil a été mis à jour avec succès');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Header title="Mon Profil" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Informations personnelles
          </ThemedText>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              value={user?.email || ''}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>CIN</ThemedText>
            <TextInput
              style={styles.input}
              value={user?.provider?.CIN || ''}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Téléphone</ThemedText>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Votre numéro de téléphone"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Localisation</ThemedText>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Votre wilaya"
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Profil professionnel
          </ThemedText>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Bio professionnelle</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Décrivez votre activité, vos compétences et votre expérience..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>
              Spécialités (séparées par des virgules)
            </ThemedText>
            <TextInput
              style={styles.input}
              value={specialties}
              onChangeText={setSpecialties}
              placeholder="Ex: Design graphique, Développement web, Marketing"
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Type de compte</ThemedText>
            <TextInput
              style={styles.input}
              value={user?.provider?.isEnterprise ? 'Entreprise' : 'Individuel'}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.saveButtonText}>
              Enregistrer les modifications
            </ThemedText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
