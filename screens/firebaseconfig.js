// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUwoXN8U-OZFuBXv824acHNSlxvX3tCfM",
  authDomain: "ce-web-8212b.firebaseapp.com",
  projectId: "ce-web-8212b",
  storageBucket: "ce-web-8212b.appspot.com",
  messagingSenderId: "121826669838",
  appId: "1:121826669838:web:4fe12f2dd18f1720c8d35f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase app and storage
export { app, getStorage };