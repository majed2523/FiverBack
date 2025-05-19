'use client';

import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ThemedText';
import { loginUser } from '@/lib/api/auth';
import { COLORS, SPACING } from '@/constants/theme';
import { Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      const response = await loginUser({ email, password });

      // Handle the response based on the role
      if (response.role === 'CLIENT') {
        router.replace('/(client)/dashboard' as any);
      } else if (response.role === 'PROVIDER') {
        router.replace('/(provider)/dashboard' as any);
      } else {
        setErrors({ general: 'Rôle utilisateur inconnu' });
      }
    } catch (error: any) {
      setErrors({
        general: error.message || 'Email ou mot de passe incorrect',
      });
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <View style={styles.registerContainer}>
      <ThemedText style={styles.registerText}>
        Pas encore de compte ?{' '}
      </ThemedText>
      <TouchableOpacity
        onPress={() => router.push('/auth/register-type' as any)}
      >
        <ThemedText style={styles.registerLink}>S'inscrire</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <AuthLayout
        title="Bienvenue"
        subtitle="Connectez-vous pour accéder à votre compte"
        footer={footer}
      >
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
            setErrors({ ...errors, email: undefined });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          leftIcon={<Mail size={20} color={COLORS.text} />}
        />

        <Input
          label="Mot de passe"
          placeholder="Votre mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: undefined });
          }}
          secureTextEntry
          error={errors.password}
          leftIcon={<Lock size={20} color={COLORS.text} />}
        />

        <Button onPress={handleLogin} loading={loading} style={styles.button}>
          Se connecter
        </Button>
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
  button: {
    marginTop: SPACING.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  registerText: {
    color: COLORS.text,
  },
  registerLink: {
    color: COLORS.primary,
    marginLeft: 4,
  },
});
