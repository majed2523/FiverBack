'use client';

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserRole } from '@/lib/api/auth';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('jwt_token');
        if (!token) {
          setUserRole(null);
        } else {
          const role = await getUserRole();
          setUserRole(role);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!userRole ? (
        // Non-authenticated routes
        <Stack.Screen name="auth" />
      ) : userRole === 'CLIENT' ? (
        // Client routes
        <Stack.Screen name="(client)" />
      ) : (
        // Provider routes
        <Stack.Screen name="(provider)" />
      )}

      {/* Common routes that should be available regardless of auth status */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
