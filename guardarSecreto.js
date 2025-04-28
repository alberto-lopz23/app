import { db } from './firebaseConfig'; // Asegúrate de que la importación sea correcta
import { collection, addDoc } from 'firebase/firestore';
import { auth } from './firebaseConfig'; // Asegúrate de tener la importación de auth

// Modificación para aceptar la URL del audio
const guardarSecreto = async (texto, audioUrl = '') => {
  try {
    const user = auth.currentUser;
    if (user) {
      const username = user.displayName || 'Una gente ahí'; // Usa el displayName o un valor por defecto

      // Guardamos el secreto junto con el nombre de usuario y la URL del audio
      await addDoc(collection(db, 'secretos'), {
        texto,
        user: username, // Aquí guardamos el nombre de usuario
        fecha: new Date(),
        audioUrl, // Guardamos la URL del audio si está disponible
      });

      console.log('✅ Secreto guardado en Firestore');
    }
  } catch (error) {
    console.error('❌ Error guardando el secreto:', error);
  }
};

export { guardarSecreto };
