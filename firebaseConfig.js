// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBp3bdFt0N0UqbrkT1ypvjXAo51dBh_vc0",
  authDomain: "secreto-29fd5.firebaseapp.com",
  projectId: "secreto-29fd5",
  storageBucket: "secreto-29fd5.appspot.com",
  messagingSenderId: "675974327152",
  appId: "1:675974327152:web:97acb9a9f6e48bc1627db5",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
