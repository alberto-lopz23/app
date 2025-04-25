import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import { db } from './firebaseConfig';
import { guardarSecreto } from './guardarSecreto'
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function SecretPostScreen() {
  const [secret, setSecret] = useState('');
  const [secrets, setSecrets] = useState([]);

  // 🔁 Leer secretos al iniciar
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'secretos'));
        const loadedSecrets = [];
        querySnapshot.forEach((doc) => {
          loadedSecrets.push(doc.data().texto);
        });
        setSecrets(loadedSecrets.reverse()); // para que se vea el más reciente arriba
      } catch (error) {
        console.error('Error al cargar secretos:', error);
      }
    };

    fetchSecrets();
  }, []);

  const handlePost = async () => {
    if (secret.trim() === '') {
      Alert.alert('Error', 'Escribe algo primero...');
      return;
    }
  
    try {
      await guardarSecreto(secret); // Guarda en Firebase
      Alert.alert('Publicado', 'Tu secreto ha sido enviado.');
      setSecret(''); // Limpia el input
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el secreto.');
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.secretContainer}>
      <Text style={styles.user}>@User</Text>
      <Text style={styles.secretText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={secrets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}
