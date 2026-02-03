import "./global.css"
import { Text, View } from "react-native";
import React from 'react';
import {  Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function App() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'tomato' }, animatedStyles]} />
      <Button title="Move" onPress={() => { offset.value = withSpring(Math.random() * 300); }} />
    </View>
  );
}