import React, { memo, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { FilterOptions } from '../../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FilterBar = memo<FilterBarProps>(({ filters, onFilterChange }) => {
  const sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ] as const;

  const handleSortChange = useCallback(
    (sortBy: FilterOptions['sortBy']) => {
      onFilterChange({ ...filters, sortBy });
    },
    [filters, onFilterChange]
  );

  return (
    <View className="bg-white dark:bg-gray-800 py-3 border-b border-gray-200 dark:border-gray-700">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-2"
      >
        {sortOptions.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isSelected={filters.sortBy === option.value}
            onPress={() => handleSortChange(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
});

FilterBar.displayName = 'FilterBar';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip = memo<FilterChipProps>(({ label, isSelected, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
  }, [scale]);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className={`px-4 py-2 rounded-full ${
        isSelected
          ? 'bg-primary-600'
          : 'bg-gray-100 dark:bg-gray-700'
      }`}
    >
      <Text
        className={`text-sm font-semibold ${
          isSelected
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
});

FilterChip.displayName = 'FilterChip';
