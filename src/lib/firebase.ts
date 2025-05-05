// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// Replace with your actual Firebase project config from the Firebase console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "tukangku-4d572.firebaseapp.com",
  databaseURL: "https://tukangku-4d572-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "tukangku-4d572",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "1054846299335",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };