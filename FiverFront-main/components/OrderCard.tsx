import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface OrderCardProps {
  client: string;
  service: string;
  price: string;
  status: 'En cours' | 'En attente' | 'Terminé' | 'Annulé';
  date: string;
  onPress?: () => void;
}

export function OrderCard({
  client,
  service,
  price,
  status,
  date,
  onPress,
}: OrderCardProps) {
  const getStatusVariant = () => {
    switch (status) {
      case 'En cours':
        return 'info';
      case 'En attente':
        return 'warning';
      case 'Terminé':
        return 'success';
      case 'Annulé':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <ThemedText style={styles.client}>{client}</ThemedText>
          <Badge label={status} variant={getStatusVariant()} />
        </View>
        <ThemedText style={styles.service}>{service}</ThemedText>
        <View style={styles.footer}>
          <ThemedText style={styles.price}>{price}</ThemedText>
          <ThemedText style={styles.date}>{date}</ThemedText>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  client: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  service: {
    ...FONTS.body2,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...FONTS.body1,
    fontWeight: '600',
    color: COLORS.primary,
  },
  date: {
    ...FONTS.caption,
    color: COLORS.textLight,
  },
});
