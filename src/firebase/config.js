
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9quQSLdXiZVz8TzRKnRxGT9tf2Q8Oi4E",
  authDomain: "react-native-d009a.firebaseapp.com",
  projectId: "react-native-d009a",
  storageBucket: "react-native-d009a.appspot.com",
  messagingSenderId: "609739345068",
  appId: "1:609739345068:web:4f1dceb71138c9e0bce309",
  measurementId: "G-KYNLPB19BC"
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export default app;
