'use client';

import type React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { logout } from '@/lib/api/auth';
import { LogOut, Menu, ChevronLeft } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS } from '@/constants/theme';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  showBack?: boolean;
  onMenuPress?: () => void;
  rightComponent?: React.ReactNode;
}

export function Header({
  title,
  showMenu = false,
  showBack = false,
  onMenuPress,
  rightComponent,
}: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login' as any);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.statusBar} barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {showBack ? (
            <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
              <ChevronLeft size={24} color={COLORS.text} />
            </TouchableOpacity>
          ) : showMenu ? (
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
              <Menu size={24} color={COLORS.text} />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        <ThemedText style={styles.title}>{title}</ThemedText>

        <View style={styles.rightContainer}>
          {rightComponent || (
            <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
              <LogOut size={20} color={COLORS.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 4,
  },
  placeholder: {
    width: 28,
  },
});
