import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; // 👉 FALTA ESTO

const firebaseConfig = {
  apiKey: "AIzaSyBp3bdFt0N0UqbrkT1ypvjXAo51dBh_vc0",
  authDomain: "secreto-29fd5.firebaseapp.com",
  projectId: "secreto-29fd5",
  storageBucket: "secreto-29fd5.appspot.com",
  messagingSenderId: "675974327152",
  appId: "1:675974327152:web:97acb9a9f6e48bc1627db5",
  databaseURL: "https://secreto-29fd5-default-rtdb.firebaseio.com", // 👉 AÑADE ESTO
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app); // 👉 AÑADE ESTO

export { auth, db, database }; // 👉 EXPORTA database también
