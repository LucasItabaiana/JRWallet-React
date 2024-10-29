
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApJ1TFfGYOY8vM9E7dC_SnRJ6m6WcLmwQ",
  authDomain: "jrwallet-26aba.firebaseapp.com",
  projectId: "jrwallet-26aba",
  storageBucket: "jrwallet-26aba.appspot.com",
  messagingSenderId: "840294201008",
  appId: "1:840294201008:web:1ce9117525c43bf79f2d75",
  measurementId: "G-3G80ENKJK2"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{app}
