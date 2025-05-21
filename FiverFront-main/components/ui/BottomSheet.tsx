'use client';

import type React from 'react';
import { useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  cancelAnimation,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { COLORS, BORDER_RADIUS } from '@/constants/theme';
import { SPRING_CONFIG } from '@/utils/animations';

const { height } = Dimensions.get('window');

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: number[];
  onClose?: () => void;
  backgroundStyle?: ViewStyle;
  handleStyle?: ViewStyle;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    { children, snapPoints = [0.5], onClose, backgroundStyle, handleStyle },
    ref
  ) => {
    const translateY = useSharedValue(height);
    const active = useSharedValue(false);
    const context = useSharedValue({ y: 0 });

    useEffect(() => {
      return () => {
        cancelAnimation(translateY);
        cancelAnimation(active);
      };
    }, [translateY, active]);

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        try {
          active.value = destination !== height;
          translateY.value = withSpring(destination, SPRING_CONFIG);
        } catch (error) {
          console.error('Animation error:', error);
        }
      },
      [active, translateY]
    );

    const open = useCallback(() => {
      const snapPoint = Math.max(0, Math.min(1, snapPoints[0]));
      scrollTo(height * (1 - snapPoint));
    }, [scrollTo, snapPoints]);

    const close = useCallback(() => {
      scrollTo(height);
      if (onClose) {
        runOnJS(onClose)();
      }
    }, [scrollTo, onClose]);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startY = translateY.value;
      },
      onActive: (event, ctx) => {
        translateY.value = ctx.startY + event.translationY;
      },
      onEnd: (event) => {
        try {
          const currentSnapPoint = height * (1 - snapPoints[0]);
          const velocity = event.velocityY;

          if (velocity > 500) {
            scrollTo(height);
            if (onClose) {
              runOnJS(onClose)();
            }
          } else {
            const endPosition = translateY.value + velocity * 0.1;
            const closestSnapPoint =
              endPosition > currentSnapPoint + 50 ? height : currentSnapPoint;

            scrollTo(closestSnapPoint);
            if (closestSnapPoint === height && onClose) {
              runOnJS(onClose)();
            }
          }
        } catch (error) {
          console.error('Gesture handler error:', error);
        }
      },
    });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
      opacity: withTiming(active.value ? 0.5 : 0),
      pointerEvents: active.value ? 'auto' : 'none',
    }));

    return (
      <>
        <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
          <TouchableWithoutFeedback onPress={close}>
            <View style={styles.overlayBackground} />
          </TouchableWithoutFeedback>
        </Animated.View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[styles.container, animatedStyle, backgroundStyle]}
          >
            <View style={[styles.handle, handleStyle]} />
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
);

// ... rest of the styles remain the same
