import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEb_6cSRyAxf0QygQf81iZChTRZbGQI8w",
  authDomain: "akgul-market.firebaseapp.com",
  projectId: "akgul-market",
  storageBucket: "akgul-market.appspot.com",   
  messagingSenderId: "860035269924",
  appId: "1:860035269924:web:99186f59a9cb5a67ca9fb1",
  measurementId: "G-SZ1TL0156L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

