import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import Message from './app/screens/Message';
import Perfil from './app/screens/Perfil';
import Chat from './app/screens/Chat';
import LoginScreen from './app/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Message" 
          component={Message} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Chat" 
          component={Chat} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
