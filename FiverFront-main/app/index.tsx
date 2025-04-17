'use client';

import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { getUserRole } from '@/lib/api/auth';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const role = await getUserRole();

        if (!role) {
          // Not logged in, redirect to login
          setRedirectTo('/auth/login');
        } else if (role === 'CLIENT') {
          // Client user, redirect to client dashboard
          setRedirectTo('/(client)/dashboard');
        } else if (role === 'PROVIDER') {
          // Provider user, redirect to provider dashboard
          setRedirectTo('/(provider)/dashboard');
        } else {
          // Unknown role, redirect to login
          setRedirectTo('/auth/login');
        }
      } catch (error) {
        setRedirectTo('/auth/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#0066FF" />
      </ThemedView>
    );
  }

  // Type assertion to handle the type error
  return redirectTo ? <Redirect href={redirectTo as any} /> : null;
}
