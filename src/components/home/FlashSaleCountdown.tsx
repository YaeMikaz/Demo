import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { FlashSale } from '../../types';
import { Card } from '../common';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FlashSaleCountdownProps {
  flashSales: FlashSale[];
  onProductPress?: (sale: FlashSale) => void;
}

export const FlashSaleCountdown = memo<FlashSaleCountdownProps>(
  ({ flashSales, onProductPress }) => {
    if (flashSales.length === 0) return null;

    return (
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
              ⚡ Flash Sale
            </Text>
          </View>
          <Text className="text-primary-600 font-semibold">
            See All
          </Text>
        </View>

        <View className="px-4 gap-3">
          {flashSales.map((sale) => (
            <FlashSaleCard
              key={sale.id}
              sale={sale}
              onPress={() => onProductPress?.(sale)}
            />
          ))}
        </View>
      </View>
    );
  }
);

FlashSaleCountdown.displayName = 'FlashSaleCountdown';

interface FlashSaleCardProps {
  sale: FlashSale;
  onPress?: () => void;
}

const FlashSaleCard = memo<FlashSaleCardProps>(({ sale, onPress }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(sale.endTime));
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(sale.endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [sale.endTime]);

  useEffect(() => {
    pulseScale.value = withSequence(
      withTiming(1.1, { duration: 500, easing: Easing.ease }),
      withTiming(1, { duration: 500, easing: Easing.ease })
    );
  }, [timeLeft.seconds, pulseScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const stockPercentage = (sale.stockLeft / 50) * 100; // Assuming max 50 stock

  return (
    <Card onPress={onPress} className="flex-row p-4">
      {/* Product Image */}
      <View className="w-24 h-24 rounded-xl overflow-hidden mr-4 bg-gray-100 dark:bg-gray-700">
        <Image
          source={{ uri: sale.product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-1 right-1 bg-red-500 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">
            -{Math.round(((sale.originalPrice - sale.salePrice) / sale.originalPrice) * 100)}%
          </Text>
        </View>
      </View>

      {/* Product Info */}
      <View className="flex-1">
        <Text
          className="text-base font-semibold text-gray-900 dark:text-white mb-1"
          numberOfLines={2}
        >
          {sale.product.name}
        </Text>

        {/* Price */}
        <View className="flex-row items-center mb-2">
          <Text className="text-xl font-bold text-red-500 mr-2">
            ${sale.salePrice}
          </Text>
          <Text className="text-sm text-gray-400 line-through">
            ${sale.originalPrice}
          </Text>
        </View>

        {/* Countdown */}
        <Animated.View style={animatedStyle} className="flex-row mb-2">
          <TimeBox value={timeLeft.hours} label="Hours" />
          <Text className="text-gray-900 dark:text-white font-bold mx-1">:</Text>
          <TimeBox value={timeLeft.minutes} label="Mins" />
          <Text className="text-gray-900 dark:text-white font-bold mx-1">:</Text>
          <TimeBox value={timeLeft.seconds} label="Secs" />
        </Animated.View>

        {/* Stock Progress */}
        <View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              Only {sale.stockLeft} left
            </Text>
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              {stockPercentage.toFixed(0)}%
            </Text>
          </View>
          <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-red-500"
              style={{ width: `${stockPercentage}%` }}
            />
          </View>
        </View>
      </View>
    </Card>
  );
});

FlashSaleCard.displayName = 'FlashSaleCard';

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox = memo<TimeBoxProps>(({ value, label }) => (
  <View className="bg-red-500 px-2 py-1 rounded">
    <Text className="text-white text-xs font-bold text-center">
      {value.toString().padStart(2, '0')}
    </Text>
  </View>
));

TimeBox.displayName = 'TimeBox';

function calculateTimeLeft(endTime: Date) {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const distance = end - now;

  if (distance < 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}
