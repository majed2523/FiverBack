import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Edit, Trash } from 'lucide-react-native';

const { width } = Dimensions.get('window');

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
}: ServiceCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <ThemedText style={styles.category}>{category}</ThemedText>
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
              onPress={() => onEdit && onEdit(id)}
            />
            <Button
              title="Supprimer"
              variant="danger"
              size="small"
              icon={<Trash size={16} color={COLORS.white} />}
              style={styles.deleteButton}
              onPress={() => onDelete && onDelete(id)}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
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
  category: {
    ...FONTS.caption,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.text,
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
  },
});
