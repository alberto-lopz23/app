import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, FlatList, Button, Platform } from 'react-native';
import { AudioRecorderPlayer } from 'react-native-audio-recorder-player';
import storage from '@react-native-firebase/storage'; // Asegúrate de que Firebase esté configurado
import { guardarSecreto } from '../../guardarSecreto';
import { cargarSecretos } from '../../cargarSecretos'
import Sound from 'react-native-sound'; // Importar react-native-sound

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function SecretPostScreen() {
  const [secret, setSecret] = useState('');
  const [secrets, setSecrets] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);

  // 👉 Cargar los secretos cuando inicia la app
  useEffect(() => {
    const obtenerSecretos = async () => {
      const data = await cargarSecretos();
      setSecrets(data); // data ya es un array de objetos con texto, fecha, usuario y audioUrl
    };
    obtenerSecretos();
  }, []);

  const handlePost = async () => {
    if (secret.trim() === '' && !audioUri) {
      Alert.alert('Error', 'Escribe algo o graba un audio primero...');
      return;
    }

    let audioUrl = '';
    if (audioUri) {
      // Subir audio a Firebase Storage
      const reference = storage().ref('audios/' + new Date().getTime() + '.m4a');
      await reference.putFile(audioUri);
      audioUrl = await reference.getDownloadURL();
    }

    await guardarSecreto(secret, audioUrl); // Guarda el secreto con el audio

    // Volvemos a cargar los secretos desde la base
    const nuevos = await cargarSecretos();
    setSecrets(nuevos);

    Alert.alert('Publicado', 'Tu secreto ha sido enviado.');
    setSecret('');
    setAudioUri(null); // Limpiar la URI del audio después de enviarlo
  };

  const startRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Error', 'La grabación de audio no está disponible en la web.');
      return;
    }

    setIsRecording(true);
    const path = 'path_to_save_audio/myaudio.m4a'; // Aquí deberías usar la ruta adecuada para tu sistema

    try {
      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log(e);
        return;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Error', 'La grabación de audio no está disponible en la web.');
      return;
    }

    setIsRecording(false);
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      console.log(result);
      setAudioUri(result); // Guarda la URI del archivo grabado
    } catch (error) {
      console.error(error);
    }
  };

  const playAudio = (audioUrl) => {
    if (Platform.OS === 'web') {
      Alert.alert('Error', 'La reproducción de audio no está disponible en la web.');
      return;
    }

    const sound = new Sound(audioUrl, null, (error) => {
      if (error) {
        console.log('Error al cargar el audio', error);
        return;
      }
      sound.play((success) => {
        if (success) {
          console.log('Reproducción exitosa');
        } else {
          console.log('Error en la reproducción');
        }
      });
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.secretContainer}>
      <Text style={styles.date}>{item.fecha}</Text>
      <Text style={styles.user}>{item.user}</Text> {/* Mostramos el nombre de usuario aquí */}
      <Text style={styles.secretText}>{item.texto}</Text>
      {item.audioUrl && (
        <TouchableOpacity onPress={() => playAudio(item.audioUrl)}>
          <Text style={styles.audioText}>Reproducir audio</Text>
        </TouchableOpacity>
      )}
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

            {Platform.OS !== 'web' && (  // Mostrar botones de grabación solo en móvil
              <View style={styles.recordingContainer}>
                <Button
                  title={isRecording ? 'Detener Grabación' : 'Grabar Audio'}
                  onPress={isRecording ? stopRecording : startRecording}
                />
              </View>
            )}
          </>
        }
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  user: {
    color: '#09f',
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 15,
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
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  recordingContainer: {
    marginTop: 20,
    alignItems: 'center',
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
  audioText: {
    color: '#1DA1F2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
