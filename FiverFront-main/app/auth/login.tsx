'use client';

import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';
import { loginUser } from '@/lib/api/auth';
import { COLORS, FONTS, BORDER_RADIUS, ANIMATION } from '@/constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
  SlideInUp,
} from 'react-native-reanimated';
import { LinearGradient } from '@/components/ui/LinearGradient';
import { ANIMATIONS } from '@/utils/animations';

const { width, height } = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(50);
  const backgroundHeight = useSharedValue(height * 0.5);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        backgroundHeight.value = withTiming(height * 0.3, { duration: 300 });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        backgroundHeight.value = withTiming(height * 0.5, { duration: 300 });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Animate elements on mount
  useEffect(() => {
    // Logo animation
    ANIMATIONS.logoEntrance(logoScale, logoOpacity);

    // Form animation with delay
    formOpacity.value = withDelay(
      ANIMATION.medium,
      withTiming(1, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
    formTranslateY.value = withDelay(
      ANIMATION.medium,
      withTiming(0, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
      transform: [{ translateY: formTranslateY.value }],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: backgroundHeight.value,
    };
  });

  // Error shake animation
  const errorShake = useSharedValue(0);

  const errorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: errorShake.value }],
    };
  });

  const triggerErrorAnimation = () => {
    ANIMATIONS.errorShake(errorShake);
  };

  // Input animations
  const emailFocus = useSharedValue(0);
  const passwordFocus = useSharedValue(0);

  const emailContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(emailFocus.value ? 1.02 : 1, { duration: 200 }) },
      ],
      borderColor: emailFocus.value
        ? withTiming(COLORS.primary, { duration: 200 })
        : withTiming(COLORS.border, { duration: 200 }),
    };
  });

  const passwordContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(passwordFocus.value ? 1.02 : 1, { duration: 200 }),
        },
      ],
      borderColor: passwordFocus.value
        ? withTiming(COLORS.primary, { duration: 200 })
        : withTiming(COLORS.border, { duration: 200 }),
    };
  });

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Veuillez saisir votre email et mot de passe');
      triggerErrorAnimation();
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await loginUser({ email, password });

      // Handle the response based on the role
      if (response.role === 'CLIENT') {
        router.replace('/(client)/dashboard' as any);
      } else if (response.role === 'PROVIDER') {
        router.replace('/(provider)/dashboard' as any);
      } else {
        setErrorMessage('Rôle utilisateur inconnu');
        triggerErrorAnimation();
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Email ou mot de passe incorrect');
      triggerErrorAnimation();
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background elements */}
      <Animated.View style={[styles.backgroundTop, backgroundAnimatedStyle]}>
        <LinearGradient
          colors={[COLORS.secondary, COLORS.secondaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View
        style={styles.backgroundBottom}
        entering={FadeIn.delay(300).duration(500)}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          logoAnimatedStyle,
          keyboardVisible && styles.logoContainerSmall,
        ]}
        entering={SlideInUp.springify().damping(15)}
      >
        <Logo
          size={keyboardVisible ? 'small' : 'large'}
          variant="vertical"
          animated
        />
      </Animated.View>

      {/* Login Form */}
      <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            Connexion
          </ThemedText>

          {errorMessage && (
            <Animated.View style={[styles.errorContainer, errorAnimatedStyle]}>
              <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
            </Animated.View>
          )}

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <Animated.View style={[styles.inputWrapper, emailContainerStyle]}>
              <AnimatedTextInput
                style={styles.input}
                placeholder="Votre adresse email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrorMessage(null);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.gray}
                onFocus={() => (emailFocus.value = 1)}
                onBlur={() => (emailFocus.value = 0)}
              />
            </Animated.View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Mot de passe</ThemedText>
            <Animated.View
              style={[styles.inputWrapper, passwordContainerStyle]}
            >
              <AnimatedTextInput
                style={styles.input}
                placeholder="Votre mot de passe"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrorMessage(null);
                }}
                secureTextEntry
                placeholderTextColor={COLORS.gray}
                onFocus={() => (passwordFocus.value = 1)}
                onBlur={() => (passwordFocus.value = 0)}
              />
            </Animated.View>
          </View>

          <Button
            title="Se connecter"
            variant="gradient"
            loading={loading}
            onPress={handleLogin}
            style={styles.button}
            fullWidth
            animated
            delay={300}
          />

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
        </Card>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  backgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  backgroundBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    opacity: 0.8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'absolute',
    top: height * 0.15,
  },
  logoContainerSmall: {
    top: height * 0.08,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: height * 0.15,
  },
  card: {
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    color: COLORS.secondary,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    ...FONTS.body2,
    color: COLORS.secondary,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputWrapper: {
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  input: {
    padding: 15,
    color: COLORS.secondary,
    ...FONTS.body1,
    width: '100%',
  },
  button: {
    marginTop: 8,
    borderRadius: BORDER_RADIUS.md,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: COLORS.secondary,
    ...FONTS.body2,
  },
  registerLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    ...FONTS.body2,
  },
});
