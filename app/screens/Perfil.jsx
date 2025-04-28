import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebaseConfig'; // Asegúrate que este import está bien
import { ref, get } from 'firebase/database';

const UserProfileScreen = () => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       // 1. Obtener el usuario autenticado
  //       const currentUser = auth.currentUser;

  //       if (!currentUser) {
  //         setError('No hay sesión iniciada.');
  //         setLoading(false);
  //         return;
  //       }

  //       console.log('Usuario actual:', currentUser);

  //       const userId = currentUser.uid;

  //       // 2. Obtener datos del usuario en Realtime Database
  //       const userRef = ref(db, `/users/${userId}`);
  //       const snapshot = await get(userRef);

  //       if (snapshot.exists()) {
  //         setUser(snapshot.val());
  //       } else {
  //         setError('No se encontraron datos del usuario.');
  //       }
  //     } catch (err) {
  //       console.error('Error al cargar el perfil:', err);
  //       setError('Error al cargar el perfil.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#09f" />
  //       <Text style={styles.loadingText}>Cargando tu perfil...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.errorText}>{error}</Text>
  //     </View>
  //   );
  // }

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.username}>{user?.username || 'Usuario sin nombre'}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Perfil de Usuario estará disponible en el futuro.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UserProfileScreen;
