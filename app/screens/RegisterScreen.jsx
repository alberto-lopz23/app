// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig'; // Importa la instancia de Firebase

// Obtén el objeto auth utilizando la instancia de Firebase
const auth = getAuth(app);  // Usa la app que ya está inicializada

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar el mensaje de error si el correo ya está en uso

  const handleRegister = () => {
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
        const errorMessage = error.message;

        // Si el error es de correo ya en uso
        if (errorMessage.includes('auth/email-already-in-use')) {
          setErrorMessage('Este correo ya está en uso. ¿Quieres iniciar sesión?');
        } else {
          setErrorMessage(errorMessage); // Si es otro error, lo mostramos
        }

        Alert.alert('Error', errorMessage); // Mostrar el mensaje de error
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
      {errorMessage ? ( // Si hay un mensaje de error, lo mostramos debajo del botón
        <Text style={styles.errorMessage}>Ya tienes cuenta. Deja la pajarería</Text>
      ) : null}
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
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});