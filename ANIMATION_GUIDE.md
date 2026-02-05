# 🎨 Animation & Gesture Quick Reference

## Basic Animations

### 1. Button Press Effect
```typescript
import { AnimatedButton } from './src/components/common';

<AnimatedButton 
  onPress={() => console.log('Pressed')}
  scaleOnPress={0.95}  // Optional, default is 0.95
>
  <Text>Press Me</Text>
</AnimatedButton>
```

### 2. Shimmer Loading
```typescript
import { Shimmer, ProductCardSkeleton } from './src/components/common';

// Custom shimmer
<Shimmer width={200} height={20} borderRadius={8} />

// Pre-built skeleton
<ProductCardSkeleton />
```

### 3. Custom Animation
```typescript
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

// Trigger animation
scale.value = withSpring(1.5);

<Animated.View style={animatedStyle}>
  {/* Content */}
</Animated.View>
```

## Gesture Handlers

### 1. Swipe to Delete (như Cart)
```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, runOnJS } from 'react-native-reanimated';

const translateX = useSharedValue(0);
const startX = useSharedValue(0);

const panGesture = Gesture.Pan()
  .onStart(() => {
    startX.value = translateX.value;
  })
  .onUpdate((event) => {
    translateX.value = startX.value + event.translationX;
  })
  .onEnd(() => {
    if (translateX.value < -100) {
      // Delete
      runOnJS(handleDelete)();
    } else {
      translateX.value = withSpring(0);
    }
  });

<GestureDetector gesture={panGesture}>
  <Animated.View style={animatedStyle}>
    {/* Content */}
  </Animated.View>
</GestureDetector>
```

### 2. Parallax Scroll
```typescript
import { useAnimatedScrollHandler, interpolate, Extrapolate } from 'react-native-reanimated';

const scrollX = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    scrollX.value = event.contentOffset.x;
  },
});

const animatedStyle = useAnimatedStyle(() => {
  const scale = interpolate(
    scrollX.value,
    [index * width, (index + 1) * width],
    [0.9, 1],
    Extrapolate.CLAMP
  );
  
  return { transform: [{ scale }] };
});
```

## Timing Functions

### Spring (Bouncy)
```typescript
withSpring(targetValue, {
  damping: 15,      // Resistance (higher = less bounce)
  stiffness: 400,   // Speed (higher = faster)
});
```

### Timing (Linear/Ease)
```typescript
withTiming(targetValue, {
  duration: 300,
  easing: Easing.ease,
});
```

### Sequence (Chain animations)
```typescript
withSequence(
  withTiming(1.1, { duration: 500 }),
  withTiming(1, { duration: 500 })
);
```

### Repeat
```typescript
withRepeat(
  withTiming(1, { duration: 1000 }),
  -1,    // Infinite
  false  // Don't reverse
);
```

## Common Patterns

### 1. Fade In
```typescript
const opacity = useSharedValue(0);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 300 });
}, []);

const style = useAnimatedStyle(() => ({
  opacity: opacity.value,
}));
```

### 2. Slide Up
```typescript
const translateY = useSharedValue(100);

useEffect(() => {
  translateY.value = withSpring(0);
}, []);

const style = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));
```

### 3. Rotate
```typescript
const rotation = useSharedValue(0);

rotation.value = withTiming(360, { duration: 1000 });

const style = useAnimatedStyle(() => ({
  transform: [{ rotate: `${rotation.value}deg` }],
}));
```

### 4. Pulse Effect (Flash Sale)
```typescript
const scale = useSharedValue(1);

useEffect(() => {
  scale.value = withRepeat(
    withSequence(
      withTiming(1.1, { duration: 500 }),
      withTiming(1, { duration: 500 })
    ),
    -1,
    false
  );
}, []);
```

## Performance Tips

✅ **DO:**
- Use `useAnimatedStyle()` for animated styles
- Use `runOnJS()` for callbacks in worklets
- Memoize gesture handlers
- Use `useSharedValue()` for animated values

❌ **DON'T:**
- Update React state in animation loop
- Use heavy computations in worklets
- Create new objects in `useAnimatedStyle()`
- Forget to cleanup animations

## Responsive Animations

```typescript
import { useResponsive } from './src/theme';

const { isMobile, isTablet } = useResponsive();

const targetScale = isMobile ? 0.95 : 0.97;
scale.value = withSpring(targetScale);
```

## Example: Custom Card Animation

```typescript
import React, { memo } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedCard = memo(({ children, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value = withSpring(0.95);
        opacity.value = 0.8;
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
        opacity.value = 1;
      }}
      onPress={onPress}
      style={animatedStyle}
    >
      {children}
    </AnimatedPressable>
  );
});
```

---

**Tip:** Check existing components in `src/components/` for more examples!
