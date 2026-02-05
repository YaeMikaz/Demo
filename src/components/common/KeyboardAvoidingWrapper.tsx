import React, { memo, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
  className?: string;
  scrollEnabled?: boolean;
}

export const KeyboardAvoidingWrapper = memo<KeyboardAvoidingWrapperProps>(
  ({ children, className = '', scrollEnabled = true }) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={`flex-1 ${className}`}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {scrollEnabled ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <>{children}</>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
);

KeyboardAvoidingWrapper.displayName = 'KeyboardAvoidingWrapper';
