import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../firebaseConfig'; // Asegúrate de tener tu firebaseConfig configurado
import { initializeApp } from 'firebase/app'; // Asegúrate de importar initializeApp

// Inicializar Firebase
initializeApp(firebaseConfig);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Maneja el inicio de sesión
  const handleLogin = () => {
    const auth = getAuth();

    // Verificar si los campos están vacíos
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    // Intentar iniciar sesión con el correo y contraseña
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Si el inicio de sesión es exitoso, puedes redirigir al usuario a otra pantalla
        const user = userCredential.user;
        Alert.alert('¡Bienvenido!', `Hola, ${user.email}`);
        navigation.navigate('Home'); // Redirigir al home (cambia esto según tu flujo de navegación)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage); // Mostrar mensaje de error
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
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
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate('Register')} // Enlace al registro
      >
        ¿No tienes cuenta? Regístrate
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
  signupText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#007BFF',
  },
});
