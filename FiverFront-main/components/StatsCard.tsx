import type React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './ui/Card';
import { COLORS, FONTS } from '@/constants/theme';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  color = COLORS.primary,
}: StatsCardProps) {
  return (
    <Card variant="elevated" style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        {icon}
      </View>
      <ThemedText style={styles.value}>{value}</ThemedText>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Card>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: 4,
  },
  title: {
    ...FONTS.caption,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
