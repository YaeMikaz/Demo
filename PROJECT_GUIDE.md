# 🛍️ E-Commerce React Native App - Bài tập 3 (Siêu khó)

Ứng dụng E-commerce với UI/UX chuyên nghiệp và hiệu năng cực cao (60 FPS), được xây dựng với React Native, NativeWind v4, Reanimated 3, và FlashList.

## ✨ Tính năng chính

### 1. Hệ thống Layout & Styling Nâng cao

- ✅ **Complex Layout**: Flexbox với Product grid đa kích thước, Masonry layout
- ✅ **Responsive Design**: Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px)
- ✅ **Safe Area Handling**: Xử lý triệt để Safe area cho tất cả màn hình
- ✅ **NativeWind v4**: Dynamic theming (Light/Dark mode), Responsive typography
- ✅ **Keyboard Avoiding**: Tự động xử lý bàn phím

### 2. Danh sách Sản phẩm Tối ưu

#### Home Screen
- 🎠 Hero Banner Carousel với Parallax effect
- 🎯 Category Grid responsive (3-6 columns)
- ⭐ Featured Products với FlashList
- ⚡ Flash Sale Countdown real-time

#### Product Listing
- 🔍 Advanced Filtering (sort by popular, price, rating)
- 📊 Multi-column Layout responsive
- 🔄 View Toggle (Grid/List)
- 🚀 FlashList optimization

#### Cart
- 🗑️ Swipe to Delete với Pan gesture
- ➕➖ Animated Quantity Controls
- 💰 Real-time Total calculation

### 3. Animation & Gesture (Reanimated 3)

- ✨ Button press animations với spring effect
- 💫 Shimmer/Skeleton loaders
- 👈 Swipe gestures để xóa cart items
- 📍 Pan gestures với smooth dragging
- 📐 Parallax effects trong banner carousel

## 🚀 Cài đặt và Chạy

### Cài đặt Dependencies
\`\`\`bash
npm install
\`\`\`

### Chạy trên Android
\`\`\`bash
# Terminal 1
npx react-native start --reset-cache

# Terminal 2
npm run android
\`\`\`

### Chạy trên iOS
\`\`\`bash
cd ios && pod install && cd ..
npm run ios
\`\`\`

## 📦 Tech Stack

- React Native 0.83.1
- React 19.2.0
- Reanimated 3 (Animations)
- FlashList (High-performance lists)
- React Navigation 7
- Gesture Handler 2
- NativeWind v4 (TailwindCSS)
- TypeScript

## 🎯 Performance Optimizations

- React.memo() cho tất cả components
- useCallback() và useMemo()
- FlashList thay vì FlatList
- Reanimated worklets (native thread)
- Memoized keyExtractors

## 🏗️ Project Structure

\`\`\`
src/
├── components/    # Reusable components
├── screens/       # App screens
├── navigation/    # Navigation setup
├── hooks/         # Custom hooks
├── theme/         # Theme & styling
├── types/         # TypeScript types
└── utils/         # Utilities & mock data
\`\`\`

## 📱 Features Demo

1. **Home Screen**: Hero banner, categories, featured products, flash sales
2. **Product Listing**: Filter, sort, grid/list view toggle
3. **Cart**: Swipe to delete, quantity controls, checkout summary

## 🔧 Configuration

- **Theme**: Edit `src/theme/colors.ts`
- **Mock Data**: Edit `src/utils/mockData.ts`
- **Responsive**: Breakpoints in `src/theme/breakpoints.ts`

---

**Bài tập 3** - Chương trình đào tạo React Native
