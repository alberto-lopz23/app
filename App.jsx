import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import Message from './app/screens/Message';
import Perfil from './app/screens/Perfil';
import Chat from './app/screens/Chat';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import Search from './app/screens/Search';
import { UserProvider } from './UserContext'; // 🔥 IMPORTA UserProvider 🔥

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider> {/* 🔥 ENVUELVE todo en UserProvider 🔥 */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Search" 
            component={Search} 
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
    </UserProvider>
  );
}
