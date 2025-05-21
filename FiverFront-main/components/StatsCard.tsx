'use client';

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './ui/Card';
import { COLORS, FONTS, ANIMATION } from '@/constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  style?: ViewStyle;
  animated?: boolean;
}

export function StatsCard({
  title,
  value,
  icon,
  color = COLORS.primary,
  style,
  animated = false,
}: StatsCardProps) {
  // Animation values
  const scale = useSharedValue(animated ? 0.8 : 1);

  // Animate on mount if animated prop is true
  React.useEffect(() => {
    if (animated) {
      scale.value = withTiming(1, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Bouncy effect
      });
    }
  }, [animated, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Card
        variant="elevated"
        style={[styles.card, { backgroundColor: color }]}
      >
        <View style={styles.iconContainer}>{icon}</View>
        <ThemedText style={styles.value}>{value}</ThemedText>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: 4,
  },
  title: {
    ...FONTS.caption,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
  },
});
