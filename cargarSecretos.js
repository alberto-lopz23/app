import { db } from './firebaseConfig'; // Importamos la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';

const cargarSecretos = async () => {
  try {
    // Obtener todos los secretos de la colección 'secretos'
    const querySnapshot = await getDocs(collection(db, 'secretos'));

    // Mapear los documentos de Firestore a un formato más manejable
    const secretos = querySnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Verificar que los campos estén presentes
      if (!data.user || !data.texto) {
        console.warn(`El documento con ID ${doc.id} no tiene los campos esperados.`);
        return null;  // Si faltan campos, no lo agregamos a la lista
      }

      return {
        id: doc.id,
        user: data.user,
        texto: data.texto,
        audioUrl: data.audioUrl || '',  // Incluimos el audioUrl si está presente
      };
    }).filter(item => item !== null); // Filtrar los secretos inválidos

    return secretos;
  } catch (error) {
    console.error('Error al cargar los secretos:', error);
    return []; // Retornamos un array vacío en caso de error
  }
};

export { cargarSecretos };
