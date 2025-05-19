'use client';

import { StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING } from '@/constants/theme';
import { User, Briefcase, ChevronLeft } from 'lucide-react-native';

export default function RegisterTypeScreen() {
  const router = useRouter();

  const handleClientRegistration = () => {
    router.push('/auth/register-client' as any);
  };

  const handleProviderRegistration = () => {
    router.push('/auth/register-provider/step1' as any);
  };

  const footer = (
    <Button
      title="Retour à la connexion"
      variant="outline"
      icon={<ChevronLeft size={20} color={COLORS.primary} />}
      onPress={() => router.back()}
      fullWidth
    />
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <AuthLayout
        title="Créer un compte"
        subtitle="Choisissez votre type de compte"
        footer={footer}
      >
        <View style={styles.optionsContainer}>
          <Card variant="elevated" style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <User size={40} color={COLORS.secondary} />
            </View>
            <ThemedText style={styles.optionTitle}>Client</ThemedText>
            <ThemedText style={styles.optionDescription}>
              Créez un compte client pour rechercher et réserver des services
            </ThemedText>
            <Button
              title="S'inscrire en tant que client"
              variant="secondary"
              onPress={handleClientRegistration}
              style={styles.optionButton}
              fullWidth
            />
          </Card>

          <Card variant="elevated" style={styles.optionCard}>
            <View
              style={[
                styles.optionIconContainer,
                { backgroundColor: COLORS.primary + '15' },
              ]}
            >
              <Briefcase size={40} color={COLORS.primary} />
            </View>
            <ThemedText style={styles.optionTitle}>Prestataire</ThemedText>
            <ThemedText style={styles.optionDescription}>
              Créez un compte prestataire pour offrir vos services et recevoir
              des commandes
            </ThemedText>
            <Button
              title="S'inscrire en tant que prestataire"
              variant="primary"
              onPress={handleProviderRegistration}
              style={styles.optionButton}
              fullWidth
            />
          </Card>
        </View>
      </AuthLayout>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  optionCard: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  optionDescription: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginBottom: SPACING.lg,
  },
  optionButton: {
    marginTop: SPACING.sm,
  },
});
