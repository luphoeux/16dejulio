// firebase-bridge.js - Configuración de Firebase
// Para usar Firestore en producción, actualiza este archivo con tus credenciales

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, writeBatch } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",              // Reemplazar
    authDomain: "YOUR_AUTH_DOMAIN",      // Reemplazar
    projectId: "mapa-16-julio",          // Reemplazar si usas otro nombre
    storageBucket: "YOUR_STORAGE_BUCKET", // Reemplazar
    messagingSenderId: "YOUR_SENDER_ID",  // Reemplazar
    appId: "YOUR_APP_ID"                  // Reemplazar
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export for module use
export { db, collection, getDocs, doc, setDoc, writeBatch };

// Export for non-module use (Global)
window.db = db;
window.FirebaseFirestore = { collection, getDocs, doc, setDoc, writeBatch };
console.log("🔥 Firebase initialized");
