import type React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  footer?: React.ReactNode;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  showLogo = true,
  footer,
}: AuthLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {showLogo && (
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          )}

          <View style={styles.headerContainer}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            {subtitle && (
              <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
            )}
          </View>

          <View style={styles.contentContainer}>{children}</View>
        </ScrollView>

        {footer && <View style={styles.footerContainer}>{footer}</View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  headerContainer: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
});
