import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Connexion",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register-type"
        options={{
          title: "Inscription",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register-client"
        options={{
          title: "Inscription Client",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register-provider/step1"
        options={{
          title: "Étape 1/3",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register-provider/step2"
        options={{
          title: "Étape 2/3",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register-provider/step3"
        options={{
          title: "Étape 3/3",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
