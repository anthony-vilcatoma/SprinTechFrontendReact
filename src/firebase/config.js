// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Genera IDs unicos
import { v4 } from "uuid"

// Esto permitirá conectarnos
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const STORAGE_ROUTE = "https://firebasestorage.googleapis.com/v0/b/springtec-ea535.appspot.com/o/";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNOFLV2Ck03kKt0gyHvP9qnO1nbyeU4iw",
  authDomain: "springtec-ea535.firebaseapp.com",
  projectId: "springtec-ea535",
  storageBucket: "springtec-ea535.appspot.com",
  messagingSenderId: "1024537601153",
  appId: "1:1024537601153:web:a74c4b51778c1cc0345980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Mediante esta constante indicaré donde se subirán los archivos
export const storage = getStorage(app);

/**
 * Guarda los archivos en firebase
 * @param {Promise<String>} file the file to upload
 * @returns url of the uploaded file
 */
export async function uploadFile(file) {
  // Obtenemos la referencia donde se subir
  const  storageRef = ref(storage, `direct-request-image/${v4()}`)
  // Recibe la referencia y el archivo a subir
  await uploadBytes(storageRef, file);
  // Retornamos la URL mediante la referencia
  const imgUrlSaved = await getDownloadURL(storageRef);
  return imgUrlSaved.replace(STORAGE_ROUTE, '');
}