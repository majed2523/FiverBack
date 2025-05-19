import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Connexion',
        }}
      />
      <Stack.Screen
        name="register-type"
        options={{
          title: 'Inscription',
        }}
      />
      <Stack.Screen
        name="register-client"
        options={{
          title: 'Inscription Client',
        }}
      />
      <Stack.Screen
        name="register-provider/step1"
        options={{
          title: 'Étape 1/3',
        }}
      />
      <Stack.Screen
        name="register-provider/step2"
        options={{
          title: 'Étape 2/3',
        }}
      />
      <Stack.Screen
        name="register-provider/step3"
        options={{
          title: 'Étape 3/3',
        }}
      />
    </Stack>
  );
}
