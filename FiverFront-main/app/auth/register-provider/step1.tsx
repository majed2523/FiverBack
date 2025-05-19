'use client';

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgressSteps } from '@/components/ui/ProgressSteps';
import { COLORS, SPACING } from '@/constants/theme';
import { Mail, Lock, ChevronLeft } from 'lucide-react-native';

export default function RegisterProviderStep1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    // Store data in params and navigate to next step
    router.push({
      pathname: '/auth/register-provider/step2',
      params: { email, password },
    } as any);
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
        title="Inscription Prestataire"
        subtitle="Créez votre compte pour offrir vos services"
        footer={footer}
        showLogo={false}
      >
        <ProgressSteps
          steps={['Compte', 'Professionnel', 'Profil']}
          currentStep={0}
        />

        {errors.general && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{errors.general}</ThemedText>
          </View>
        )}

        <Input
          label="Email"
          placeholder="Votre adresse email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail size={20} color={COLORS.text} />}
          error={errors.email}
        />

        <Input
          label="Mot de passe"
          placeholder="Choisir un mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          secureTextEntry
          leftIcon={<Lock size={20} color={COLORS.text} />}
          error={errors.password}
        />

        <Input
          label="Confirmation du mot de passe"
          placeholder="Confirmer votre mot de passe"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword)
              setErrors({ ...errors, confirmPassword: undefined });
          }}
          secureTextEntry
          leftIcon={<Lock size={20} color={COLORS.text} />}
          error={errors.confirmPassword}
        />

        <Button
          title="Suivant"
          onPress={handleNext}
          loading={loading}
          style={styles.nextButton}
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
  nextButton: {
    marginTop: SPACING.lg,
  },
});
