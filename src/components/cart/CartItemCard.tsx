import React, { memo, useCallback } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { CartItem } from '../../types';
import { AnimatedButton } from '../common';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3;

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemCard = memo<CartItemCardProps>(
  ({ item, onUpdateQuantity, onRemove }) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(1);
    const opacity = useSharedValue(1);
    const startX = useSharedValue(0);

    const handleRemove = useCallback(() => {
      onRemove(item.id);
    }, [item.id, onRemove]);

    const panGesture = Gesture.Pan()
      .onStart(() => {
        startX.value = translateX.value;
      })
      .onUpdate((event) => {
        const newTranslateX = startX.value + event.translationX;
        translateX.value = newTranslateX > 0 ? 0 : newTranslateX;
      })
      .onEnd(() => {
        if (translateX.value < SWIPE_THRESHOLD) {
          // Swipe to delete
          translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
          opacity.value = withTiming(0, { duration: 300 });
          itemHeight.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(handleRemove)();
          });
        } else {
          // Snap back
          translateX.value = withSpring(0);
        }
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const containerStyle = useAnimatedStyle(() => ({
      height: itemHeight.value === 1 ? undefined : 0,
      opacity: opacity.value,
      marginBottom: itemHeight.value === 1 ? 12 : 0,
    }));

    const deleteButtonStyle = useAnimatedStyle(() => ({
      opacity: translateX.value < -50 ? 1 : 0,
    }));

    return (
      <Animated.View style={containerStyle} className="mx-4">
        <View className="relative">
          {/* Delete Button Background */}
          <Animated.View
            style={deleteButtonStyle}
            className="absolute right-0 top-0 bottom-0 bg-red-500 rounded-xl justify-center px-6"
          >
            <Text className="text-white font-bold">Delete</Text>
          </Animated.View>

          {/* Cart Item */}
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={animatedStyle}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 flex-row"
            >
              {/* Product Image */}
              <View className="w-20 h-20 rounded-lg overflow-hidden mr-4 bg-gray-100 dark:bg-gray-700">
                <Image
                  source={{ uri: item.product.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Product Info */}
              <View className="flex-1">
                <Text
                  className="text-base font-semibold text-gray-900 dark:text-white mb-1"
                  numberOfLines={2}
                >
                  {item.product.name}
                </Text>

                {/* Selected Options */}
                {(item.selectedColor || item.selectedSize) && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {[item.selectedColor, item.selectedSize]
                      .filter(Boolean)
                      .join(' • ')}
                  </Text>
                )}

                {/* Price and Quantity */}
                <View className="flex-row items-center justify-between mt-auto">
                  <Text className="text-lg font-bold text-primary-600">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>

                  {/* Quantity Controls */}
                  <View className="flex-row items-center">
                    <QuantityButton
                      label="-"
                      onPress={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    />
                    <Text className="text-base font-semibold text-gray-900 dark:text-white mx-4">
                      {item.quantity}
                    </Text>
                    <QuantityButton
                      label="+"
                      onPress={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    />
                  </View>
                </View>
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </Animated.View>
    );
  }
);

CartItemCard.displayName = 'CartItemCard';

interface QuantityButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const QuantityButton = memo<QuantityButtonProps>(
  ({ label, onPress, disabled }) => {
    return (
      <AnimatedButton
        onPress={onPress}
        disabled={disabled}
        className={`w-8 h-8 rounded-full items-center justify-center ${
          disabled
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'bg-primary-600'
        }`}
      >
        <Text
          className={`text-lg font-bold ${
            disabled ? 'text-gray-400' : 'text-white'
          }`}
        >
          {label}
        </Text>
      </AnimatedButton>
    );
  }
);

QuantityButton.displayName = 'QuantityButton';
