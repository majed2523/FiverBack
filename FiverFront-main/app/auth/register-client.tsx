'use client';

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { registerClient } from '@/lib/api/auth';
import { COLORS, SPACING } from '@/constants/theme';
import { User, Mail, Lock, ChevronLeft } from 'lucide-react-native';

export default function RegisterClientScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Le nom est requis';
      isValid = false;
    }

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

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      await registerClient({
        firstName,
        lastName,
        email,
        password,
      });

      router.replace('/(client)/dashboard' as any);
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
        title="Inscription Client"
        subtitle="Créez votre compte client pour commencer"
        footer={footer}
        showLogo={false}
      >
        {errors.general && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{errors.general}</ThemedText>
          </View>
        )}

        <View style={styles.nameRow}>
          <Input
            label="Prénom"
            placeholder="Votre prénom"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (errors.firstName)
                setErrors({ ...errors, firstName: undefined });
            }}
            error={errors.firstName}
            leftIcon={<User size={20} color={COLORS.text} />}
            style={styles.nameInput}
          />
          <Input
            label="Nom"
            placeholder="Votre nom"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (errors.lastName)
                setErrors({ ...errors, lastName: undefined });
            }}
            error={errors.lastName}
            leftIcon={<User size={20} color={COLORS.text} />}
            style={styles.nameInput}
          />
        </View>

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
          error={errors.email}
          leftIcon={<Mail size={20} color={COLORS.text} />}
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
          error={errors.password}
          leftIcon={<Lock size={20} color={COLORS.text} />}
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
          error={errors.confirmPassword}
          leftIcon={<Lock size={20} color={COLORS.text} />}
        />

        <Button
          title="S'inscrire"
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
  nameRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  nameInput: {
    flex: 1,
  },
  registerButton: {
    marginTop: SPACING.lg,
  },
});
