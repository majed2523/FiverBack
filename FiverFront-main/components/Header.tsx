'use client';

import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { logout } from '@/lib/api/auth';
import { LogOut, Menu, ChevronLeft } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, ANIMATION } from '@/constants/theme';
import { Logo } from './ui/Logo';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  SlideInDown,
} from 'react-native-reanimated';
import { ANIMATIONS } from '@/utils/animations';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
  showLogo?: boolean;
  transparent?: boolean;
  onMenuPress?: () => void;
  rightComponent?: React.ReactNode;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Header({
  title,
  showMenu = false,
  showBack = false,
  showLogo = false,
  transparent = false,
  onMenuPress,
  rightComponent,
}: HeaderProps) {
  const router = useRouter();

  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);
  const buttonScale = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withTiming(1, {
      duration: ANIMATION.medium,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    translateY.value = withTiming(0, {
      duration: ANIMATION.medium,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login' as any);
  };

  const handleBack = () => {
    router.back();
  };

  const onPressIn = () => {
    buttonScale.value = ANIMATIONS.buttonPress(0.9);
  };

  const onPressOut = () => {
    buttonScale.value = ANIMATIONS.buttonPress(1);
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const renderContent = () => (
    <Animated.View style={[styles.headerContent, animatedStyle]}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <AnimatedTouchable
            style={[styles.iconButton, buttonAnimatedStyle]}
            onPress={handleBack}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <ChevronLeft
              size={24}
              color={transparent ? COLORS.white : COLORS.secondary}
            />
          </AnimatedTouchable>
        ) : showMenu ? (
          <AnimatedTouchable
            style={[styles.iconButton, buttonAnimatedStyle]}
            onPress={onMenuPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Menu
              size={24}
              color={transparent ? COLORS.white : COLORS.secondary}
            />
          </AnimatedTouchable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {showLogo ? (
        <Logo size="small" variant="horizontal" />
      ) : title ? (
        <ThemedText
          style={[styles.title, transparent && styles.titleTransparent]}
        >
          {title}
        </ThemedText>
      ) : (
        <View />
      )}

      <View style={styles.rightContainer}>
        {rightComponent || (
          <AnimatedTouchable
            style={[styles.iconButton, buttonAnimatedStyle]}
            onPress={handleLogout}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <LogOut
              size={20}
              color={transparent ? COLORS.white : COLORS.error}
            />
          </AnimatedTouchable>
        )}
      </View>
    </Animated.View>
  );

  if (transparent) {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Animated.View
          style={[styles.headerTransparent]}
          entering={SlideInDown.duration(300)}
        >
          {renderContent()}
        </Animated.View>
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <Animated.View
        style={[styles.header]}
        entering={SlideInDown.duration(300)}
      >
        {renderContent()}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  headerTransparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 12,
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
    color: COLORS.secondary,
    flex: 1,
    textAlign: 'center',
  },
  titleTransparent: {
    color: COLORS.white,
  },
  iconButton: {
    padding: 4,
  },
  placeholder: {
    width: 28,
  },
});
