'use client';

import React, { useEffect } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { ANIMATION } from '@/constants/theme';

interface LinearGradientProps {
  colors: [string, string, ...string[]]; // At least 2 colors required
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
  animated?: boolean;
}

export function LinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
  animated = false,
}: LinearGradientProps) {
  const opacity = useSharedValue(animated ? 0 : 1);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => (opacity.value = 1), 0);
      return () => {
        clearTimeout(timer);
        cancelAnimation(opacity);
      };
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: ANIMATION.medium }),
  }));

  const gradientStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, gradientStyle]}>
        <ExpoLinearGradient
          colors={colors}
          start={start}
          end={end}
          style={[StyleSheet.absoluteFill, styles.gradient]}
        />
      </Animated.View>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
  },
});
