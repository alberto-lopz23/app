import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const conversations = [
  {
    id: '1',
    username: 'juanito_123',
    lastMessage: 'Nos vemos mañana a las 5',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    username: 'sofia_love',
    lastMessage: 'Dale, yo te aviso ✌️',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    username: 'el_pana',
    lastMessage: 'Bro, ¿jugamos esta noche?',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const ConversationsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Chat', { user: item })}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Volver</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  lastMessage: {
    color: '#777',
    marginTop: 2,
  },
  header: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
  }
});

export default ConversationsScreen;
