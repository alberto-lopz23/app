import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database'; // Para guardar en Realtime Database
import { app } from '../../firebaseConfig';  // Asegúrate de importar la instancia de Firebase correctamente

const auth = getAuth(app);  // Usa la instancia de Firebase para obtener el servicio de autenticación
const db = getDatabase(app);  // Realtime Database

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }

    // Primero, registra al usuario con email y contraseña
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar el nombre de usuario y la info adicional en la base de datos
        set(ref(db, 'users/' + user.uid), {
          username: username,
          email: email,
        }).then(() => {
          Alert.alert('¡Registro Exitoso!', `Bienvenido, ${username}`);
          navigation.navigate('Login');
        }).catch((error) => {
          Alert.alert('Error', error.message);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Registrarse" onPress={handleRegister} />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}
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
    backgroundColor: '#17c1a8',
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
    color: '#2a2a2g',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});
