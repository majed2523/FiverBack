import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  type ViewStyle,
  ImageErrorEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { COLORS, FONTS, SPACING, ANIMATION } from '@/constants/theme';
import { Edit, Trash } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPress?: () => void;
  style?: ViewStyle;
}

export function ServiceCard({
  id,
  title,
  description,
  price,
  category,
  image,
  onEdit,
  onDelete,
  onPress,
  style,
}: ServiceCardProps) {
  const scale = useSharedValue(1);
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = (
    error: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    console.error('Image loading error:', error.nativeEvent.error);
    setImageError(true);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPress={onPress}
      activeOpacity={0.7}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={animatedStyle}
    >
      <Card variant="elevated" style={[styles.card, style]}>
        {!imageError ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            onError={handleImageError}
          />
        ) : (
          <View style={[styles.image, styles.imageError]}>
            <ThemedText>Image non disponible</ThemedText>
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <ThemedText style={styles.category}>{category}</ThemedText>
          </View>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.description} numberOfLines={2}>
            {description}
          </ThemedText>
          <ThemedText style={styles.price}>{price}</ThemedText>

          <View style={styles.actions}>
            <Button
              title="Modifier"
              variant="outline"
              size="small"
              icon={<Edit size={16} color={COLORS.primary} />}
              style={styles.editButton}
              onPress={() => onEdit?.(id)}
            />
            <Button
              title="Supprimer"
              variant="danger"
              size="small"
              icon={<Trash size={16} color={COLORS.white} />}
              style={styles.deleteButton}
              onPress={() => onDelete?.(id)}
            />
          </View>
        </View>
      </Card>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.md,
  },
  categoryContainer: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: SPACING.xs,
  },
  category: {
    ...FONTS.caption,
    color: COLORS.primary,
    fontWeight: '500',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },
  description: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  price: {
    ...FONTS.h4,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    marginRight: SPACING.xs,
  },
  deleteButton: {
    flex: 1,
    marginLeft: SPACING.xs,
    backgroundColor: COLORS.error,
  },
  imageError: {
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
