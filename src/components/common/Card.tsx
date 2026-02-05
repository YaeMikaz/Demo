import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { AnimatedButton } from './AnimatedButton';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  elevation?: boolean;
}

export const Card = memo<CardProps>(
  ({ children, className = '', onPress, elevation = true, style, ...props }) => {
    const baseClass = `bg-white dark:bg-gray-800 rounded-xl overflow-hidden ${
      elevation ? 'shadow-md' : ''
    } ${className}`;

    if (onPress) {
      return (
        <AnimatedButton
          className={baseClass}
          onPress={onPress}
          style={style as any}
          {...props}
        >
          {children}
        </AnimatedButton>
      );
    }

    return (
      <View className={baseClass} style={style} {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
