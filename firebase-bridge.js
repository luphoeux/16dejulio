import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, writeBatch } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    projectId: "mapa-16-julio",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export for module use
export { db, collection, getDocs, doc, setDoc, writeBatch };

// Export for non-module use (Global)
window.db = db;
window.FirebaseFirestore = { collection, getDocs, doc, setDoc, writeBatch };
console.log("🔥 Firebase initialized");
