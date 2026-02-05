# 🚀 QUICK START GUIDE

## Chạy Ứng dụng trong 3 bước

### Bước 1: Cài đặt
```bash
npm install
```

### Bước 2: Start Metro Bundler
```bash
npx react-native start --reset-cache
```

### Bước 3: Chạy ứng dụng
**Android:**
```bash
npm run android
```

**iOS:**
```bash
cd ios && pod install && cd ..
npm run ios
```

---

## 🎯 Tính năng chính để test

### 🏠 Home Screen
- **Swipe** hero banners → Xem parallax effect
- **Tap** categories → Navigate to products
- **Scroll** featured products → Smooth horizontal scroll
- **Watch** flash sale countdown → Real-time timer

### 📦 Product Listing
- **Tap** filter chips → Sort products
- **Toggle** Grid/List icon → Switch views
- **Scroll** products → Test FlashList performance

### 🛒 Cart
- **Swipe left** on items → Delete animation
- **Tap +/-** buttons → Quantity animations
- **Watch** total → Real-time calculation

---

## 💡 Pro Tips

### Test Animations
- Mọi button đều có **press animation** (scale + opacity)
- **Swipe gestures** mượt mà với spring physics
- **Shimmer loading** khi data đang load

### Test Responsive
- Resize window (nếu dùng emulator)
- Xem layout thay đổi theo breakpoints:
  - Mobile: 2-3 columns
  - Tablet: 3-4 columns
  - Desktop: 4-6 columns

### Test Performance
- Open **React DevTools Profiler**
- Check **FPS counter** (should be 60 FPS)
- Monitor **render times** (should be < 16ms)

---

## 🐛 Nếu gặp lỗi

### Metro bundler không start
```bash
npx react-native start --reset-cache
```

### Build Android fail
```bash
cd android
./gradlew clean
cd ..
npm install
npm run android
```

### iOS build fail
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Gesture handler không hoạt động
Kiểm tra `App.tsx` có wrap bằng `GestureHandlerRootView`:
```typescript
<GestureHandlerRootView style={{ flex: 1 }}>
  {/* App content */}
</GestureHandlerRootView>
```

---

## 📚 Documentation

- **Full Guide:** [PROJECT_GUIDE.md](PROJECT_GUIDE.md)
- **Implementation:** [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- **Animations:** [ANIMATION_GUIDE.md](ANIMATION_GUIDE.md)
- **Checklist:** [FINAL_CHECKLIST.md](FINAL_CHECKLIST.md)

---

## ⚡ Quick Commands

```bash
# Start Metro
npm start

# Run Android
npm run android

# Run iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint

# Clean build
cd android && ./gradlew clean && cd ..
```

---

## 🎨 Code Examples

### Use AnimatedButton
```typescript
import { AnimatedButton } from './src/components/common';

<AnimatedButton onPress={() => console.log('Pressed')}>
  <Text>Press Me</Text>
</AnimatedButton>
```

### Use Cart Hook
```typescript
import { useCart } from './src/hooks';

const { cartItems, addToCart, totalPrice } = useCart();
```

### Use Theme Hook
```typescript
import { useTheme } from './src/hooks';

const { isDark, toggleTheme } = useTheme();
```

---

**Happy Coding! 🎉**
