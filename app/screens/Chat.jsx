// src/screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebaseConfig';
import database from '@react-native-firebase/database';
import ButtonGeneral from '../components/ButtonGeneral';

const ChatScreen = ({ route, navigation }) => {
  const { user, otherUserId } = route.params || {}; // Obtenemos los parámetros pasados
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  if (!user || !otherUserId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:2043178322. */}
        <ButtonGeneral title="Volver" to="Home" />
        <Text>Error: No se pasaron los parámetros correctamente.</Text>
      </View>
    );
  }

  const chatId = user.id < otherUserId ? `${user.id}_${otherUserId}` : `${otherUserId}_${user.id}`;

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        senderId: user.id, // Usamos el id del usuario actual para enviar el mensaje
        text: newMessage,
        timestamp: database.ServerValue.TIMESTAMP,
      };

      database().ref(`/chats/${chatId}/messages`).push(message);
      setNewMessage('');
    }
  };

  useEffect(() => {
    const onValueChange = database().ref(`/chats/${chatId}/messages`).on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });

    return () => {
      database().ref(`/chats/${chatId}/messages`).off('value', onValueChange);
    };
  }, [chatId]);

  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.senderId === user.id ? styles.myMessage : styles.theirMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Chat con {otherUserId}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flex: 1 }}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#121212' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  messageBubble: { padding: 10, marginBottom: 8, maxWidth: '75%', borderRadius: 15 },
  myMessage: { backgroundColor: '#007aff', alignSelf: 'flex-end', borderTopRightRadius: 0 },
  theirMessage: { backgroundColor: '#e5e5ea', alignSelf: 'flex-start', borderTopLeftRadius: 0 },
  messageText: { color: '#000' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 20, padding: 10, marginRight: 10 },
});

export default ChatScreen;
