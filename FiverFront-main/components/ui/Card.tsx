'use client';

import React from 'react';
import { StyleSheet, type ViewProps } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ANIMATIONS, SPRING_CONFIG } from '@/utils/animations';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'interactive';
  animated?: boolean;
  delay?: number;
  interactive?: boolean;
}

export function Card({
  children,
  variant = 'default',
  animated = false,
  delay = 0,
  interactive = false,
  style,
  ...props
}: CardProps) {
  // Animation values
  const opacity = useSharedValue(animated ? 0 : 1);
  const translateY = useSharedValue(animated ? 20 : 0);
  const scale = useSharedValue(1);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  // Animate on mount if animated prop is true
  React.useEffect(() => {
    if (animated) {
      ANIMATIONS.cardEntrance(opacity, translateY, delay);
    }
  }, [animated, opacity, translateY, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  // Interactive card gesture handling
  const gesture = Gesture.Pan()
    .onBegin((event) => {
      if (!interactive) return;
      scale.value = withSpring(0.98, SPRING_CONFIG);
    })
    .onUpdate((event) => {
      if (!interactive) return;
      const tiltX = interpolate(
        event.y,
        [-100, 100],
        [5, -5],
        Extrapolate.CLAMP
      );
      const tiltY = interpolate(
        event.x,
        [-100, 100],
        [-5, 5],
        Extrapolate.CLAMP
      );
      rotateX.value = tiltX;
      rotateY.value = tiltY;
    })
    .onFinalize(() => {
      if (!interactive) return;
      scale.value = withSpring(1, SPRING_CONFIG);
      rotateX.value = withSpring(0, SPRING_CONFIG);
      rotateY.value = withSpring(0, SPRING_CONFIG);
    });

  const cardContent = (
    <Animated.View
      style={[
        styles.card,
        variant === 'outlined' && styles.outlined,
        variant === 'elevated' && styles.elevated,
        variant === 'interactive' && styles.interactive,
        animatedStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );

  if (interactive) {
    return <GestureDetector gesture={gesture}>{cardContent}</GestureDetector>;
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    overflow: 'hidden',
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  elevated: {
    ...SHADOWS.medium,
  },
  interactive: {
    ...SHADOWS.medium,
    backgroundColor: COLORS.card,
  },
});
