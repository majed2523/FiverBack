'use client';

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { COLORS, FONTS, BORDER_RADIUS, ANIMATION } from '@/constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from './LinearGradient';
import { ANIMATIONS } from '@/utils/animations';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'text'
    | 'danger'
    | 'gradient';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  animated?: boolean;
  delay?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
  gradientColors,
  animated = false,
  delay = 0,
  ...props
}: ButtonProps) {
  // Animation values
  const scale = useSharedValue(animated ? 0.9 : 1);
  const opacity = useSharedValue(animated ? 0 : 1);
  const translateY = useSharedValue(animated ? 10 : 0);

  // Handle press animations
  const onPressIn = () => {
    scale.value = ANIMATIONS.buttonPress(0.95);
  };

  const onPressOut = () => {
    scale.value = ANIMATIONS.buttonPress(1);
  };

  // Animate on mount if animated prop is true
  React.useEffect(() => {
    if (animated) {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: ANIMATION.medium,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      );
      translateY.value = withDelay(
        delay,
        withTiming(0, {
          duration: ANIMATION.medium,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      );
      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1.05, {
            duration: ANIMATION.medium,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(1, {
            duration: ANIMATION.medium,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      );
    }
  }, [animated, opacity, translateY, scale, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  // Render button content
  const renderContent = () => {
    return (
      <>
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'outline' || variant === 'text'
                ? COLORS.primary
                : COLORS.white
            }
            size="small"
          />
        ) : (
          <>
            {icon && (
              <Animated.View style={styles.iconContainer}>{icon}</Animated.View>
            )}
            <Text
              style={[
                styles.text,
                styles[`${variant}Text`],
                size === 'small' && styles.smallText,
                size === 'large' && styles.largeText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </>
    );
  };

  // Render gradient button
  if (variant === 'gradient') {
    const colors = gradientColors || COLORS.gradientPrimary;

    return (
      <AnimatedTouchable
        style={[
          styles.button,
          styles[size],
          fullWidth && styles.fullWidth,
          props.disabled && styles.disabled,
          animatedStyle,
          style,
        ]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.9}
        {...props}
      >
        <LinearGradient colors={colors} style={styles.gradientButton}>
          {renderContent()}
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  // Render regular button
  return (
    <AnimatedTouchable
      style={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        props.disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.9}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  gradient: {
    backgroundColor: 'transparent',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  small: {
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    minHeight: 52,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.button,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  textText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: COLORS.white,
  },
  gradientText: {
    color: COLORS.white,
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  iconContainer: {
    marginRight: 8,
  },
});
