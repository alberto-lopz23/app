import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
} from 'react-native';

import { guardarSecreto } from '../../guardarSecreto';
import { cargarSecretos } from '../../cargarSecretos';

export default function SecretPostScreen() {
  const [secret, setSecret] = useState('');
  const [secrets, setSecrets] = useState([]);

  // 👉 Cargar los secretos cuando inicia la app
  useEffect(() => {
    const obtenerSecretos = async () => {
      const data = await cargarSecretos();
      setSecrets(data); // data ya es un array de objetos con texto y fecha
    };
    obtenerSecretos();
  }, []);

  const handlePost = async () => {
    if (secret.trim() === '') {
      Alert.alert('Error', 'Escribe algo primero...');
      return;
    }

    await guardarSecreto(secret);

    // Volvemos a cargar los secretos desde la base
    const nuevos = await cargarSecretos();
    setSecrets(nuevos);

    Alert.alert('Publicado', 'Tu secreto ha sido enviado.');
    setSecret('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.secretContainer}>
      <Text style={styles.user}>@User</Text>
      <Text style={styles.secretText}>{item.texto}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={secrets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Cuéntanos tu secreto...</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={6}
              placeholder="Escribe aquí de forma anónima"
              placeholderTextColor="#999"
              value={secret}
              onChangeText={setSecret}
            />
            <TouchableOpacity style={styles.button} onPress={handlePost}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
          </>
        }
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 50, // para que no se corte el final
  },  
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    width: '100%',
    justifyContent: 'flex-start', // Cambié a 'flex-start' para que los elementos estén alineados al principio
  },
  user: {
    color: '#09f',
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 15, // Reduje un poco el margen
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15, // Añadí un espacio entre el input y el botón
  },
  button: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20, // Añadí un poco de margen abajo para dar espacio a la lista
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secretList: {
    marginTop: 10,
  },
  secretContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secretText: {
    color: '#fff',
    fontSize: 16,
  },
});
