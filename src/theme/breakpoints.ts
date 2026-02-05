import { Dimensions } from 'react-native';

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export const useResponsive = () => {
  const { width } = Dimensions.get('window');
  
  return {
    isMobile: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop,
    width,
  };
};

export const getResponsiveValue = <T,>(
  mobile: T,
  tablet: T,
  desktop: T
): T => {
  const { width } = Dimensions.get('window');
  
  if (width >= breakpoints.desktop) return desktop;
  if (width >= breakpoints.tablet) return tablet;
  return mobile;
};
