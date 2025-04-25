import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';  // Asegúrate de que esta ruta sea correcta
import Message from '../../screens/Message';    // Lo mismo aquí

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  {/* NavigationContainer solo aquí */}
      <Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Message" component={Message} />
</Stack.Navigator>
    </NavigationContainer>
  );
}
