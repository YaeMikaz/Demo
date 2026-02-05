import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaWrapper, AnimatedButton } from '../components/common';
import { CartItemCard } from '../components/cart';
import { useCart } from '../hooks';

export const CartScreen = memo(() => {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <SafeAreaWrapper>
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-6xl mb-4">🛒</Text>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Cart is Empty
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Add some products to get started
          </Text>
          <AnimatedButton
            className="bg-primary-600 px-8 py-4 rounded-full"
            onPress={() => console.log('Navigate to products')}
          >
            <Text className="text-white font-semibold text-base">
              Start Shopping
            </Text>
          </AnimatedButton>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          Cart ({totalItems})
        </Text>
      </View>

      {/* Cart Items */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pt-4 pb-6"
      >
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </ScrollView>

      {/* Bottom Summary */}
      <View className="bg-white dark:bg-gray-800 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        {/* Subtotal */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600 dark:text-gray-400">Subtotal</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        {/* Shipping */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600 dark:text-gray-400">Shipping</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Free
          </Text>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-200 dark:bg-gray-700 my-3" />

        {/* Total */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            Total
          </Text>
          <Text className="text-2xl font-bold text-primary-600">
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        {/* Checkout Button */}
        <AnimatedButton
          className="bg-primary-600 py-4 rounded-full items-center"
          onPress={() => console.log('Checkout')}
        >
          <Text className="text-white font-bold text-lg">
            Proceed to Checkout
          </Text>
        </AnimatedButton>
      </View>
    </SafeAreaWrapper>
  );
});

CartScreen.displayName = 'CartScreen';
