import React, { memo } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Product } from '../../types';
import { Card } from '../common';

interface FeaturedProductsProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
}

export const FeaturedProducts = memo<FeaturedProductsProps>(
  ({ products, onProductPress }) => {
    return (
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </Text>
          <Text className="text-primary-600 font-semibold">
            See All
          </Text>
        </View>

        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-4 gap-3"
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => onProductPress?.(item)}
            />
          )}
        />
      </View>
    );
  }
);

FeaturedProducts.displayName = 'FeaturedProducts';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const ProductCard = memo<ProductCardProps>(({ product, onPress }) => {
  return (
    <Card onPress={onPress} className="w-40 p-3">
      {/* Discount Badge */}
      {product.discount && (
        <View className="absolute top-2 right-2 z-10 bg-red-500 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">
            -{product.discount}%
          </Text>
        </View>
      )}

      {/* Product Image */}
      <View className="w-full h-36 rounded-xl overflow-hidden mb-2 bg-gray-100 dark:bg-gray-700">
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

      {/* Rating */}
      <View className="flex-row items-center mb-2">
        <Text className="text-yellow-500 text-xs mr-1">★</Text>
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          {product.rating} ({product.reviews})
        </Text>
      </View>

      {/* Price */}
      <View className="flex-row items-center">
        <Text className="text-lg font-bold text-primary-600">
          ${product.price}
        </Text>
        {product.originalPrice && (
          <Text className="text-xs text-gray-400 line-through ml-2">
            ${product.originalPrice}
          </Text>
        )}
      </View>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
