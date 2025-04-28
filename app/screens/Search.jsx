import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { searchUserByUsername } from '../../firebaseFunctions';  
import ButtonGeneral from '../components/ButtonGeneral';

export default function SearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      alert('Por favor ingresa un nombre de usuario para buscar.');
      return;
    }

    setIsLoading(true);

    const foundUsers = await searchUserByUsername(searchTerm);
    setUsers(foundUsers);
    setIsLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Pressable style={styles.userText} onPress={() => navigation.navigate('Perfil', { user: item })} >{item.username}</Pressable>
      <ButtonGeneral title="Chat" to="Chat" params={{ user: item }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Volver</Text>
        </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Buscar usuario por nombre"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Buscar" onPress={handleSearch} />
      
      {isLoading && <Text>Buscando...</Text>}

      {users.length === 0 && !isLoading && (
        <Text style={styles.noResults}>No se encontraron usuarios.</Text>
      )}

      <FlatList
        data={Object.values(users)}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}  // Mejor usar uid
        style={styles.results}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  results: {
    marginTop: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 18,
  },
  noResults: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});
