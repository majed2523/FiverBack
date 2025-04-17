'use client';

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserRole } from '@/lib/api/auth';
import { Redirect } from 'expo-router';

export default function ProviderLayout() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const role = await getUserRole();
        setIsAuthorized(role === 'PROVIDER');
      } catch (error) {
        setIsAuthorized(false);
      }
    }

    checkAuth();
  }, []);

  // Show nothing while checking authentication
  if (isAuthorized === null) {
    return null;
  }

  // Redirect to login if not authorized
  if (isAuthorized === false) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Mon Profil',
        }}
      />
      <Stack.Screen
        name="services"
        options={{
          title: 'Mes Services',
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'Commandes',
        }}
      />
    </Stack>
  );
}
