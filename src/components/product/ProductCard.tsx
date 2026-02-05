import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { Product } from '../../types';
import { Card } from '../common';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  viewMode: 'grid' | 'list';
}

export const ProductCard = memo<ProductCardProps>(
  ({ product, onPress, viewMode }) => {
    if (viewMode === 'list') {
      return <ProductListItem product={product} onPress={onPress} />;
    }

    return (
      <Card onPress={onPress} className="flex-1 p-3 m-1">
        {/* Discount Badge */}
        {product.discount && (
          <View className="absolute top-2 right-2 z-10 bg-red-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">
              -{product.discount}%
            </Text>
          </View>
        )}

        {/* Product Image */}
        <View className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100 dark:bg-gray-700">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <Text
          className="text-sm font-semibold text-gray-900 dark:text-white mb-1"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        {/* Category */}
        <Text
          className="text-xs text-gray-500 dark:text-gray-400 mb-1"
          numberOfLines={1}
        >
          {product.category}
        </Text>

        {/* Rating */}
        <View className="flex-row items-center mb-2">
          <Text className="text-yellow-500 text-xs mr-1">★</Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews})
          </Text>
        </View>

        {/* Price */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base font-bold text-primary-600">
              ${product.price}
            </Text>
            {product.originalPrice && (
              <Text className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </Text>
            )}
          </View>
          {!product.inStock && (
            <Text className="text-xs text-red-500 font-semibold">
              Out of Stock
            </Text>
          )}
        </View>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';

// List view variant
const ProductListItem = memo<{ product: Product; onPress?: () => void }>(
  ({ product, onPress }) => {
    return (
      <Card onPress={onPress} className="flex-row p-4 mb-3 mx-4">
        {/* Product Image */}
        <View className="w-24 h-24 rounded-xl overflow-hidden mr-4 bg-gray-100 dark:bg-gray-700">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {product.discount && (
            <View className="absolute top-1 right-1 bg-red-500 px-2 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">
                -{product.discount}%
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="flex-1">
          <Text
            className="text-base font-semibold text-gray-900 dark:text-white mb-1"
            numberOfLines={2}
          >
            {product.name}
          </Text>

          <Text
            className="text-xs text-gray-500 dark:text-gray-400 mb-2"
            numberOfLines={1}
          >
            {product.category}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center mb-2">
            <Text className="text-yellow-500 text-sm mr-1">★</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews} reviews)
            </Text>
          </View>

          {/* Price */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-primary-600 mr-2">
                ${product.price}
              </Text>
              {product.originalPrice && (
                <Text className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </Text>
              )}
            </View>
            {!product.inStock && (
              <Text className="text-xs text-red-500 font-semibold">
                Out of Stock
              </Text>
            )}
          </View>
        </View>
      </Card>
    );
  }
);

ProductListItem.displayName = 'ProductListItem';
