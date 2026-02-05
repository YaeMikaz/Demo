// Component Index - Danh sách các components đã được implement

export * from './common';
export * from './home';
export * from './product';
export * from './cart';

/**
 * COMMON COMPONENTS (src/components/common/)
 * - SafeAreaWrapper: Wrapper với safe area handling
 * - KeyboardAvoidingWrapper: Wrapper với keyboard avoiding
 * - AnimatedButton: Button với scale animation khi press
 * - Card: Base card component với optional onPress
 * - Shimmer: Skeleton loader với shimmer effect
 * - ProductCardSkeleton: Pre-built skeleton cho product card
 * 
 * HOME COMPONENTS (src/components/home/)
 * - HeroBanner: Carousel banner với parallax effect
 * - CategoryGrid: Grid categories responsive
 * - FeaturedProducts: Horizontal scrolling products
 * - FlashSaleCountdown: Flash sale với countdown timer
 * 
 * PRODUCT COMPONENTS (src/components/product/)
 * - ProductCard: Product card với Grid/List view
 * - FilterBar: Sort và filter chips
 * 
 * CART COMPONENTS (src/components/cart/)
 * - CartItemCard: Cart item với swipe to delete gesture
 * 
 * SCREENS (src/screens/)
 * - HomeScreen: Màn hình chính
 * - ProductListingScreen: Danh sách sản phẩm
 * - CartScreen: Giỏ hàng
 * 
 * HOOKS (src/hooks/)
 * - useTheme: Theme management (light/dark)
 * - useCart: Cart state management
 * 
 * THEME (src/theme/)
 * - colors: Color palette
 * - spacing: Spacing constants
 * - typography: Font styles
 * - breakpoints: Responsive utilities
 */
