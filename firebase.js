import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqEq-X4HCV97d7Q-I4NInv2eIG_OtqopE",
  authDomain: "gerenciador-tcc-f66a1.firebaseapp.com",
  projectId: "gerenciador-tcc-f66a1",
  storageBucket: "gerenciador-tcc-f66a1.firebasestorage.app",
  messagingSenderId: "746357318325",
  appId: "1:746357318325:web:e1600dde9056f4305f54fc",
  measurementId: "G-B078KQKWT7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, addDoc, getDocs };