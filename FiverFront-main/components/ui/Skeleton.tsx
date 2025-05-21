'use client';

import { useEffect } from 'react';
import { StyleSheet, type ViewStyle, type DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/theme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
  shimmer?: boolean;
  delay?: number;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  shimmer = true,
  delay = 0,
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);
  const translateX = useSharedValue(-100);

  useEffect(() => {
    if (shimmer) {
      try {
        translateX.value = withDelay(
          delay,
          withRepeat(
            withTiming(100, {
              duration: 1000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            -1,
            false
          )
        );
        opacity.value = withDelay(
          delay,
          withRepeat(
            withSequence(
              withTiming(0.5, { duration: 500 }),
              withTiming(0.3, { duration: 500 })
            ),
            -1,
            true
          )
        );
      } catch (error) {
        console.error('Animation error:', error);
      }
    }

    return () => {
      cancelAnimation(translateX);
      cancelAnimation(opacity);
    };
  }, [shimmer, opacity, translateX, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
    >
      {shimmer && (
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.shimmer, shimmerStyle]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: COLORS.lightGray,
    overflow: 'hidden',
  },
  shimmer: {
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
