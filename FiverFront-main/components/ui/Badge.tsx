import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, BORDER_RADIUS } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'small' | 'medium';
}

export function Badge({
  label,
  variant = 'default',
  size = 'medium',
}: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        styles[variant],
        size === 'small' && styles.smallBadge,
      ]}
    >
      <Text style={[styles.text, size === 'small' && styles.smallText]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.round,
    alignSelf: 'flex-start',
  },
  smallBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  default: {
    backgroundColor: COLORS.lightGray,
  },
  success: {
    backgroundColor: COLORS.primaryLight,
  },
  warning: {
    backgroundColor: COLORS.accent + '30', // 30% opacity
  },
  error: {
    backgroundColor: COLORS.error + '30', // 30% opacity
  },
  info: {
    backgroundColor: COLORS.secondary + '30', // 30% opacity
  },
  text: {
    ...FONTS.caption,
    fontWeight: '500',
  },
  smallText: {
    fontSize: 10,
  },
});
