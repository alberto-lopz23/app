// firebase/cargarSecretos.js
import { db } from './firebaseConfig'; // Importamos la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';

const cargarSecretos = async () => {
  try {
    // Obtener todos los secretos de la colección 'secretos'
    const querySnapshot = await getDocs(collection(db, 'secretos'));

    // Mapear los documentos de Firestore a un formato más manejable
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), // Incluye todos los campos del documento
    }));
  } catch (error) {
    console.error('Error al cargar los secretos:', error);
    return []; // Retornamos un array vacío en caso de error
  }
};

export { cargarSecretos };
