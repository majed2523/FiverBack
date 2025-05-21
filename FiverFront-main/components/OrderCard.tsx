import {
  View,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { COLORS, FONTS, SPACING, ANIMATION } from '@/constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type OrderStatus = 'En cours' | 'En attente' | 'Terminé' | 'Annulé';

interface OrderCardProps {
  client: string;
  service: string;
  price: string;
  status: OrderStatus;
  date: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function OrderCard({
  client,
  service,
  price,
  status,
  date,
  onPress,
  style,
}: OrderCardProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    return () => {
      cancelAnimation(scale);
    };
  }, [scale]);

  const onPressIn = () => {
    try {
      scale.value = withTiming(0.98, {
        duration: ANIMATION.fast,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } catch (error) {
      console.error('Animation error:', error);
    }
  };

  const onPressOut = () => {
    try {
      scale.value = withTiming(1, {
        duration: ANIMATION.fast,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } catch (error) {
      console.error('Animation error:', error);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getStatusVariant = ():
    | 'info'
    | 'warning'
    | 'success'
    | 'error'
    | 'default' => {
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
    <AnimatedTouchable
      onPress={onPress}
      activeOpacity={0.7}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={animatedStyle}
    >
      <Card variant="elevated" style={[styles.card, style]}>
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
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  client: {
    ...FONTS.h4,
    color: COLORS.secondary,
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
