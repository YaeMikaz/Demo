import React, { memo } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Category } from '../../types';
import { Card } from '../common';
import { useResponsive } from '../../theme';

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
}

export const CategoryGrid = memo<CategoryGridProps>(
  ({ categories, onCategoryPress }) => {
    const { isMobile, isTablet } = useResponsive();
    
    const numColumns = isMobile ? 3 : isTablet ? 4 : 6;

    return (
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </Text>
          <Text className="text-primary-600 font-semibold">
            See All
          </Text>
        </View>

        <FlatList
          data={categories}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerClassName="px-4"
          columnWrapperClassName="gap-3 mb-3"
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => onCategoryPress?.(item)}
              width={`${100 / numColumns - 2}%`}
            />
          )}
        />
      </View>
    );
  }
);

CategoryGrid.displayName = 'CategoryGrid';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
  width: string;
}

const CategoryCard = memo<CategoryCardProps>(
  ({ category, onPress, width }) => {
    return (
      <Card
        onPress={onPress}
        className="items-center p-3"
        style={{ width: width as any }}
      >
        <View className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100 dark:bg-gray-700">
          <Image
            source={{ uri: category.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Text
          className="text-xs font-medium text-gray-900 dark:text-white text-center"
          numberOfLines={2}
        >
          {category.name}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {category.productCount}
        </Text>
      </Card>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';
