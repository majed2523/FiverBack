'use client';

import { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgressSteps } from '@/components/ui/ProgressSteps';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING } from '@/constants/theme';
import { CreditCard, MapPin, ChevronLeft } from 'lucide-react-native';

export default function RegisterProviderStep2() {
  const params = useLocalSearchParams();
  const [CIN, setCIN] = useState('');
  const [location, setLocation] = useState('');
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    CIN?: string;
    location?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      CIN?: string;
      location?: string;
    } = {};
    let isValid = true;

    if (!CIN) {
      newErrors.CIN = 'Le numéro CIN est requis';
      isValid = false;
    }

    if (!location) {
      newErrors.location = 'La localisation est requise';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    // Navigate to next step with all params
    router.push({
      pathname: '/auth/register-provider/step3',
      params: {
        ...params,
        CIN,
        location,
        isEnterprise: isEnterprise ? 'true' : 'false',
      },
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
        title="Informations professionnelles"
        subtitle="Complétez vos informations professionnelles"
        footer={footer}
        showLogo={false}
      >
        <ProgressSteps
          steps={['Compte', 'Professionnel', 'Profil']}
          currentStep={1}
        />

        {errors.general && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{errors.general}</ThemedText>
          </View>
        )}

        <Input
          label="Numéro CIN"
          placeholder="Votre numéro CIN"
          value={CIN}
          onChangeText={(text) => {
            setCIN(text);
            if (errors.CIN) setErrors({ ...errors, CIN: undefined });
          }}
          leftIcon={<CreditCard size={20} color={COLORS.text} />}
          error={errors.CIN}
        />

        <Input
          label="Localisation"
          placeholder="Votre wilaya"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            if (errors.location) setErrors({ ...errors, location: undefined });
          }}
          leftIcon={<MapPin size={20} color={COLORS.text} />}
          error={errors.location}
        />

        <View style={styles.switchContainer}>
          <View>
            <ThemedText style={styles.switchLabel}>Entreprise</ThemedText>
            <ThemedText style={styles.switchDescription}>
              Activez cette option si vous représentez une entreprise
            </ThemedText>
          </View>
          <Switch
            value={isEnterprise}
            onValueChange={setIsEnterprise}
            trackColor={{ false: COLORS.gray, true: COLORS.primaryLight }}
            thumbColor={isEnterprise ? COLORS.primary : COLORS.lightGray}
          />
        </View>

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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  switchDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    maxWidth: '80%',
  },
  nextButton: {
    marginTop: SPACING.lg,
  },
});
