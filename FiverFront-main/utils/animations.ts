import { Dimensions } from 'react-native';
import {
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
  SlideInRight,
  FadeIn,
  FadeOut,
  SlideOutLeft,
} from 'react-native-reanimated';
import { ANIMATION } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

// Spring configurations for natural-feeling animations
export const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

// Timing configurations for precise animations
export const TIMING_CONFIG = {
  duration: ANIMATION.medium,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

// Bounce timing configuration
export const BOUNCE_TIMING = {
  duration: ANIMATION.medium,
  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
};

// Screen transitions
export const PAGE_TRANSITIONS = {
  entering: SlideInRight.springify().damping(15).mass(1).stiffness(100),
  exiting: SlideOutLeft.springify().damping(15).mass(1).stiffness(100),
};

// Animation presets
export const ANIMATIONS = {
  // Button press animation
  buttonPress: (scale) => {
    'worklet';
    return withTiming(scale, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  },

  // Card entrance animation
  cardEntrance: (opacity, translateY, delay = 0) => {
    'worklet';
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
  },

  // Logo entrance animation
  logoEntrance: (scale, opacity) => {
    'worklet';
    opacity.value = withTiming(1, {
      duration: ANIMATION.medium,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    scale.value = withSequence(
      withTiming(1.1, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      withTiming(1, {
        duration: ANIMATION.medium,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
  },

  // Error shake animation
  errorShake: (translateX) => {
    'worklet';
    translateX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  },

  // Pulse animation
  pulse: (scale) => {
    'worklet';
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 300, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite repeat
      true // Reverse
    );
  },

  // Staggered list item entrance
  staggeredListItem: (index, delay = 100) => {
    return {
      entering: FadeIn.delay(index * delay).duration(300),
      exiting: FadeOut.duration(200),
    };
  },
};

// Responsive sizing
export const responsive = {
  width,
  height,
  isSmallDevice: width < 375,
};
