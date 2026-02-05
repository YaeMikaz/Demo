import React, { memo, useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  scaleOnPress?: number;
}

export const AnimatedButton = memo<AnimatedButtonProps>(
  ({ children, className = '', style, scaleOnPress = 0.95, onPress, ...props }) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(scaleOnPress, {
        damping: 15,
        stiffness: 400,
      });
      opacity.value = withTiming(0.8, { duration: 100 });
    }, [scale, opacity, scaleOnPress]);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 400,
      });
      opacity.value = withTiming(1, { duration: 100 });
    }, [scale, opacity]);

    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className={className}
        style={[style, animatedStyle]}
        {...props}
      >
        {children}
      </AnimatedPressable>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
