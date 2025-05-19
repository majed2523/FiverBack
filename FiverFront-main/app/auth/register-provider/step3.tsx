'use client';

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgressSteps } from '@/components/ui/ProgressSteps';
import { registerProvider } from '@/lib/api/auth';
import { COLORS, SPACING } from '@/constants/theme';
import { FileText, ChevronLeft } from 'lucide-react-native';

export default function RegisterProviderStep3() {
  const params = useLocalSearchParams();
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    bio?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      bio?: string;
    } = {};
    let isValid = true;

    if (!bio) {
      newErrors.bio = 'La bio professionnelle est requise';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});

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
    } catch (error: any) {
      console.error('Register error:', error);
      setErrors({
        general:
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <Button
      title="Retour"
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
        title="Votre profil professionnel"
        subtitle="Décrivez votre activité et vos compétences"
        footer={footer}
        showLogo={false}
      >
        <ProgressSteps
          steps={['Compte', 'Professionnel', 'Profil']}
          currentStep={2}
        />

        {errors.general && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{errors.general}</ThemedText>
          </View>
        )}

        <Input
          label="Bio professionnelle"
          placeholder="Décrivez votre activité, vos compétences et votre expérience..."
          value={bio}
          onChangeText={(text) => {
            setBio(text);
            if (errors.bio) setErrors({ ...errors, bio: undefined });
          }}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          style={styles.bioInput}
          leftIcon={<FileText size={20} color={COLORS.text} />}
          error={errors.bio}
        />

        <Button
          title="Terminer l'inscription"
          onPress={handleRegister}
          loading={loading}
          style={styles.registerButton}
          fullWidth
        />
      </AuthLayout>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: COLORS.error,
    padding: SPACING.sm,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  bioInput: {
    height: 150,
    paddingTop: SPACING.sm,
  },
  registerButton: {
    marginTop: SPACING.lg,
  },
});
