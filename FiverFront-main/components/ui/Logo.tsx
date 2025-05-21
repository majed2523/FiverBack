'use client';

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { COLORS } from '@/constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical' | 'icon';
  style?: ViewStyle;
  animated?: boolean;
}

export function Logo({
  size = 'medium',
  variant = 'horizontal',
  style,
  animated = false,
}: LogoProps) {
  // Logo sizes based on variant and size
  const getSize = () => {
    if (variant === 'icon') {
      return size === 'small' ? 24 : size === 'medium' ? 36 : 48;
    }
    return size === 'small' ? 100 : size === 'medium' ? 150 : 200;
  };

  // Animation values
  const scale = useSharedValue(animated ? 0.8 : 1);

  // Animate on mount if animated prop is true
  React.useEffect(() => {
    if (animated) {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  }, [animated, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Render the appropriate logo variant
  const renderLogo = () => {
    if (variant === 'icon') {
      return (
        <View
          style={[
            styles.iconContainer,
            { width: getSize(), height: getSize() },
          ]}
        >
          {/* Replace with your actual logo SVG or image */}
          <View
            style={[
              styles.logoPlaceholder,
              { backgroundColor: COLORS.primary },
            ]}
          />
        </View>
      );
    }

    if (variant === 'horizontal') {
      return (
        <View style={styles.horizontalContainer}>
          <View
            style={[
              styles.iconContainer,
              { width: getSize() * 0.3, height: getSize() * 0.3 },
            ]}
          >
            <View
              style={[
                styles.logoPlaceholder,
                { backgroundColor: COLORS.primary },
              ]}
            />
          </View>
          <ThemedText
            style={[
              styles.logoText,
              { fontSize: size === 'small' ? 18 : size === 'medium' ? 24 : 32 },
            ]}
          >
            Rigelny
          </ThemedText>
        </View>
      );
    }

    return (
      <View style={styles.verticalContainer}>
        <View
          style={[
            styles.iconContainer,
            { width: getSize() * 0.5, height: getSize() * 0.5 },
          ]}
        >
          <View
            style={[
              styles.logoPlaceholder,
              { backgroundColor: COLORS.primary },
            ]}
          />
        </View>
        <ThemedText
          style={[
            styles.logoText,
            { fontSize: size === 'small' ? 18 : size === 'medium' ? 24 : 32 },
          ]}
        >
          Rigelny
        </ThemedText>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {renderLogo()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: '80%',
    height: '80%',
    borderRadius: 8,
  },
  logoText: {
    color: COLORS.secondary,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 1,
  },
});
