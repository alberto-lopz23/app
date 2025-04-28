// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig'; // Asegúrate de importar la instancia de Firebase correctamente
import { useUser } from '../../UserContext'; // Importa el contexto para guardar al usuario

const auth = getAuth(app);  // Usa la instancia de Firebase para obtener el servicio de autenticación

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setCurrentUser } = useUser(); // Usamos el contexto para setear al usuario globalmente

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser({ id: user.uid, email: user.email }); // Guardamos al usuario en el contexto
        Alert.alert('¡Bienvenido!', `Hola, ${user.email}`);
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes('auth/user-not-found')) {
          setErrorMessage('No tienes una cuenta. ¿Quieres registrarte?');
        } else {
          setErrorMessage(errorMessage);
        }
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/fondoReLog.png')} />
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
      {errorMessage ? <Text style={styles.errorMessage}>Cuenta no encontrada. Registrate bitch</Text> : null}
      <Text style={styles.signupText} onPress={() => navigation.navigate('Register')}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#17c1a8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, borderRadius: 5 },
  signupText: { textAlign: 'center', marginTop: 10, color: '#2a2a2g' },
  errorMessage: { textAlign: 'center', color: 'red', marginTop: 10, fontSize: 14 },
  logo: { width: '100%', height: '30%', alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' },
});
