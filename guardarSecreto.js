import { db } from './firebaseConfig'; // Asegúrate de que la importación sea correcta
import { collection, addDoc } from 'firebase/firestore';

const guardarSecreto = async (texto) => {
  try {
    // Guardamos el texto del secreto en la colección 'secretos'
    await addDoc(collection(db, 'secretos'), {
      texto,
      fecha: new Date(),
    });
    console.log('✅ Secreto guardado en Firestore');
  } catch (error) {
    console.error('❌ Error guardando el secreto:', error);
  }
};

export { guardarSecreto }; // Exportación correcta
