import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface ShimmerProps extends ViewProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
}

export const Shimmer = memo<ShimmerProps>(
  ({ width = '100%', height = 20, borderRadius = 8, className = '' }) => {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 })
        ),
        -1,
        false
      );
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <Animated.View
        className={`bg-gray-300 dark:bg-gray-700 ${className}`}
        style={[
          animatedStyle,
          { width: width as any, height: height as any, borderRadius },
        ]}
      />
    );
  }
);

Shimmer.displayName = 'Shimmer';

// Skeleton for product card
export const ProductCardSkeleton = memo(() => {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4">
      <Shimmer width="100%" height={200} borderRadius={12} className="mb-3" />
      <Shimmer width="80%" height={16} className="mb-2" />
      <Shimmer width="60%" height={14} className="mb-2" />
      <View className="flex-row justify-between items-center mt-2">
        <Shimmer width={80} height={20} />
        <Shimmer width={60} height={32} borderRadius={16} />
      </View>
    </View>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';
