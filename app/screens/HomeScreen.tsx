import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Secrets from '../components/Secrets';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Secrets />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',

  },
});