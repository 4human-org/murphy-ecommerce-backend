import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {//put your firebase app info, same with .env file put your paypal 
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "human-2ef87",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
