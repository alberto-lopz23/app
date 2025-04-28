// firebaseFunctions.js
import { getDatabase, ref, set, get, query, orderByChild, startAt, endAt } from "firebase/database";
import { getAuth } from "firebase/auth";

// Función para guardar el nombre de usuario y otros detalles en Firebase Realtime Database
export const saveUserProfile = (user) => {
  const db = getDatabase();
  set(ref(db, 'users/' + user.uid), {
    username: user.username,
    email: user.email,
    // Puedes agregar otros datos como foto de perfil, ubicación, etc.
  });
};

// Función para buscar usuarios por nombre de usuario
export const searchUserByUsername = async (searchTerm) => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');

  // Filtrar los usuarios por nombre de usuario utilizando el término de búsqueda
  const q = query(
    usersRef, 
    orderByChild('username'), 
    startAt(searchTerm), 
    endAt(searchTerm + '\uf8ff') // Incluir resultados similares
  );

  const snapshot = await get(q);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {}; // Si no hay usuarios que coincidan
  }
};
