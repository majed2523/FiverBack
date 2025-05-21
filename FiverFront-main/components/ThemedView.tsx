import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { COLORS } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    {
      light: lightColor || COLORS.background,
      dark: darkColor || COLORS.background,
    },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
