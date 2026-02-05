import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Image, Dimensions, Text, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated';
import { Banner } from '../../types';
import { AnimatedButton } from '../common';

interface HeroBannerProps {
  banners: Banner[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 200;

export const HeroBanner = memo<HeroBannerProps>(({ banners }) => {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  }, []);

  return (
    <View className="mb-6">
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner, index) => (
          <BannerItem
            key={banner.id}
            banner={banner}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-3">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full mx-1 ${
              index === currentIndex
                ? 'w-6 bg-primary-600'
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
});

HeroBanner.displayName = 'HeroBanner';

interface BannerItemProps {
  banner: Banner;
  index: number;
  scrollX: SharedValue<number>;
}

const BannerItem = memo<BannerItemProps>(({ banner, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <AnimatedButton
      className="px-4"
      style={[animatedStyle, { width: SCREEN_WIDTH, height: BANNER_HEIGHT }] as any}
    >
      <View className="flex-1 rounded-2xl overflow-hidden">
        <Image
          source={{ uri: banner.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30 justify-center px-6">
          <Text className="text-white text-3xl font-bold mb-2">
            {banner.title}
          </Text>
          <Text className="text-white text-lg mb-4">
            {banner.subtitle}
          </Text>
          <View className="bg-white px-6 py-3 rounded-full self-start">
            <Text className="text-primary-600 font-semibold">
              {banner.ctaText}
            </Text>
          </View>
        </View>
      </View>
    </AnimatedButton>
  );
});

BannerItem.displayName = 'BannerItem';
