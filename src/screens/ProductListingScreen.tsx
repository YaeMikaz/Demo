import React, { memo, useCallback, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaWrapper, AnimatedButton } from '../components/common';
import { ProductCard, FilterBar } from '../components/product';
import { mockProducts } from '../utils/mockData';
import { Product, FilterOptions, ViewMode } from '../types';
import { useResponsive } from '../theme';

export const ProductListingScreen = memo(() => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    sortBy: 'popular',
  });

  const { isMobile, isTablet } = useResponsive();

  const numColumns = useMemo(() => {
    if (viewMode === 'list') return 1;
    return isMobile ? 2 : isTablet ? 3 : 4;
  }, [viewMode, isMobile, isTablet]);

  const sortedProducts = useMemo(() => {
    const products = [...mockProducts];

    switch (filters.sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.reverse();
      default:
        return products;
    }
  }, [filters.sortBy]);

  const handleProductPress = useCallback((product: Product) => {
    console.log('Product pressed:', product.name);
    // Navigate to product detail
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item)}
        viewMode={viewMode}
      />
    ),
    [handleProductPress, viewMode]
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  return (
    <SafeAreaWrapper>
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 px-4 py-4 flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </Text>
        <AnimatedButton
          onPress={toggleViewMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          <Text className="text-gray-900 dark:text-white text-lg">
            {viewMode === 'grid' ? '☰' : '▦'}
          </Text>
        </AnimatedButton>
      </View>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* Products List */}
      <View className="flex-1">
        <FlashList
          data={sortedProducts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          estimatedItemSize={viewMode === 'list' ? 120 : 250}
          contentContainerStyle={{
            paddingHorizontal: viewMode === 'grid' ? 8 : 0,
            paddingTop: 12,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaWrapper>
  );
});

ProductListingScreen.displayName = 'ProductListingScreen';
