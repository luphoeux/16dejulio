// firebase-bridge.js - Configuración de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, writeBatch } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase - Proyecto: dejulio3d
const firebaseConfig = {
    apiKey: "AIzaSyC4js6Sx9W7siA-ElMJNrU4KbURDbsDYvg",
    authDomain: "dejulio3d.firebaseapp.com",
    projectId: "dejulio3d",
    storageBucket: "dejulio3d.firebasestorage.app",
    messagingSenderId: "83342852594",
    appId: "1:83342852594:web:0e4467d7eb1ea015256b6b",
    measurementId: "G-Z6YXFBT36H"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export for module use
export { db, collection, getDocs, doc, setDoc, writeBatch };

// Export for non-module use (Global)
window.db = db;
window.FirebaseFirestore = { collection, getDocs, doc, setDoc, writeBatch };
console.log("🔥 Firebase initialized successfully - Project: dejulio3d");
