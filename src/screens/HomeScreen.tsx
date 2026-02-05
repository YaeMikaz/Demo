import React, { memo, useCallback, useState } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaWrapper } from '../components/common';
import {
  HeroBanner,
  CategoryGrid,
  FeaturedProducts,
  FlashSaleCountdown,
} from '../components/home';
import {
  mockBanners,
  mockCategories,
  mockProducts,
  mockFlashSales,
} from '../utils/mockData';
import { Category, Product, FlashSale } from '../types';

export const HomeScreen = memo(() => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleCategoryPress = useCallback((category: Category) => {
    console.log('Category pressed:', category.name);
    // Navigate to category products
  }, []);

  const handleProductPress = useCallback((product: Product) => {
    console.log('Product pressed:', product.name);
    // Navigate to product detail
  }, []);

  const handleFlashSalePress = useCallback((sale: FlashSale) => {
    console.log('Flash sale pressed:', sale.product.name);
    // Navigate to product detail
  }, []);

  const featuredProducts = mockProducts.filter((p) => p.isFeatured);

  return (
    <SafeAreaWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <View className="text-2xl font-bold text-gray-900 dark:text-white">
            Discover
          </View>
        </View>

        {/* Hero Banner */}
        <HeroBanner banners={mockBanners} />

        {/* Category Grid */}
        <CategoryGrid
          categories={mockCategories}
          onCategoryPress={handleCategoryPress}
        />

        {/* Flash Sale */}
        <FlashSaleCountdown
          flashSales={mockFlashSales}
          onProductPress={handleFlashSalePress}
        />

        {/* Featured Products */}
        <FeaturedProducts
          products={featuredProducts}
          onProductPress={handleProductPress}
        />

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaWrapper>
  );
});

HomeScreen.displayName = 'HomeScreen';
