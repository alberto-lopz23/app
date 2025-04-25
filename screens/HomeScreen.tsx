import React from 'react';
import { View } from 'react-native';
import Secrets from '../components/Secrets';
import Header from '../components/Header';

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <Secrets />
    </View>
  );
}
