// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAKWiPoIMzyVKlbr4BBIYW1ed5yNKkIE8Y",
//   authDomain: "shopping-list-e81f7.firebaseapp.com",
//   projectId: "shopping-list-e81f7",
//   storageBucket: "shopping-list-e81f7.appspot.com",
//   messagingSenderId: "1098810216801",
//   appId: "1:1098810216801:web:3676a30455721d5dc93520",
//   measurementId: "G-92ZGT555QX"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4RQAY0-ZKsCWOi-pq-CFUnBWiN8N9n_o",
  authDomain: "shopping-lists2.firebaseapp.com",
  projectId: "shopping-lists2",
  storageBucket: "shopping-lists2.appspot.com",
  messagingSenderId: "70086950598",
  appId: "1:70086950598:web:68d7d594d632aa773461c7",
  measurementId: "G-LRC66GLTWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {db,app} // 