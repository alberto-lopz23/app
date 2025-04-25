// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../firebaseConfig'; // Asegúrate de tener tu firebaseConfig configurado

// Inicializar Firebase (si no lo has hecho en otro lugar)
import { initializeApp } from 'firebase/app';
initializeApp(firebaseConfig);

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const auth = getAuth();

    // Verificar si los campos están vacíos
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    // Intentar registrar un nuevo usuario
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Si el registro es exitoso, puedes redirigir al usuario a la pantalla de inicio
        const user = userCredential.user;
        Alert.alert('¡Registrado exitosamente!', `Bienvenido, ${user.email}`);
        navigation.navigate('Home'); // Redirigir al home
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage); // Mostrar mensaje de error
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')} // Enlace al inicio de sesión
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#007BFF',
  },
});
