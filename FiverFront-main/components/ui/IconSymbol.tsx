import { MaterialIcons } from '@expo/vector-icons';
import type { StyleProp, TextStyle } from 'react-native';

// Define the mapping of icon names
const MAPPING: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  // Add your icon mappings here
  home: 'home',
  settings: 'settings',
  // ... other mappings
};

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>; // Changed from ViewStyle to TextStyle
}

export function IconSymbol({
  name,
  size = 24,
  color = '#000',
  style,
}: IconSymbolProps) {
  // Make sure the name exists in the mapping
  if (!MAPPING[name]) {
    console.warn(`Icon name "${name}" not found in mapping`);
    return null;
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
