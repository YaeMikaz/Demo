import React, { memo, ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
  children: ReactNode;
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const SafeAreaWrapper = memo<SafeAreaWrapperProps>(
  ({ children, className = '', edges = ['top', 'bottom'] }) => {
    return (
      <SafeAreaView 
        edges={edges}
        className={`flex-1 ${className}`}
      >
        {children}
      </SafeAreaView>
    );
  }
);

SafeAreaWrapper.displayName = 'SafeAreaWrapper';
