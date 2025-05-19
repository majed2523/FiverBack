import type React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

export function Card({
  children,
  variant = 'default',
  style,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'outlined' && styles.outlined,
        variant === 'elevated' && styles.elevated,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  elevated: {
    ...SHADOWS.medium,
  },
});
