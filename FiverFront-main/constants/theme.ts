import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive sizing helper
const scale = (size: number) => (width / 375) * size;

export const COLORS = {
  // Primary brand colors
  primary: '#FF5722', // Bright orange
  primaryDark: '#E64A19',
  primaryLight: '#FFCCBC',

  // Secondary brand colors
  secondary: '#1A1046', // Deep purple/navy
  secondaryDark: '#0D0823',
  secondaryLight: '#312A5A',

  // Accent colors
  accent: '#3F51B5', // Indigo blue
  accentLight: '#C5CAE9',

  // Supporting colors
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#9E9E9E',
  darkGray: '#616161',
  black: '#000000',

  // Functional colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // UI colors
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1A1046', // Using secondary as text color
  textLight: '#757575',
  border: '#E0E0E0',
  statusBar: '#1A1046', // Deep purple for status bar

  // Gradient colors
  gradientPrimary: ['#FF5722', '#FF8A65'],
  gradientSecondary: ['#1A1046', '#312A5A'],
};

export const FONTS = {
  h1: {
    fontSize: scale(28),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: scale(24),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  h3: {
    fontSize: scale(20),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  h4: {
    fontSize: scale(18),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  body1: {
    fontSize: scale(16),
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: scale(14),
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: scale(12),
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  button: {
    fontSize: scale(16),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const SIZES = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(40),
  xxxl: scale(80),

  // Responsive dimensions
  width,
  height,
  card: width * 0.85,
};

export const SPACING = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

export const BORDER_RADIUS = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(24),
  xxl: scale(32),
  round: 9999,
};

// Animation durations
export const ANIMATION = {
  fast: 200,
  medium: 300,
  slow: 500,
};
