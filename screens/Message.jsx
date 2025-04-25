// Suggested code may be subject to a license. Learn more: ~LicenseLog:2323403389.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Message = () => {
  return (
    <View style={styles.container}>
      <Text>Message</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});