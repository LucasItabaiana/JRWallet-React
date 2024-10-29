

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApJ1TFfGYOY8vM9E7dC_SnRJ6m6WcLmwQ",
    authDomain: "jrwallet-26aba.firebaseapp.com",
    projectId: "jrwallet-26aba",
    storageBucket: "jrwallet-26aba.appspot.com",
    messagingSenderId: "840294201008",
    appId: "1:840294201008:web:15f1d23c82be36709f2d75",
    measurementId: "G-HMY60XLFW3"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
