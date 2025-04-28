import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig';  // Asegúrate de importar la instancia de Firebase correctamente


const auth = getAuth(app);  // Usa la instancia de Firebase para obtener el servicio de autenticación

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('¡Bienvenido!', `Hola, ${user.email}`);
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorMessage = error.message;

        // Verifica si el error es de usuario no encontrado
        if (errorMessage.includes('auth/user-not-found')) {
          setErrorMessage('No tienes una cuenta. ¿Quieres registrarte?');
        } else {
          setErrorMessage(errorMessage); // Si es otro tipo de error, lo muestra
        }

        Alert.alert('Error', errorMessage);
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
      {errorMessage ? ( // Si hay un mensaje de error, lo mostramos
        <Text style={styles.errorMessage}>Cuenta no encontrada. Registrate bitch</Text>
      ) : null}
      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate('Register')}
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
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});