// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFb2FIRlLJlg-7CK5h_d5dffHG42URzTY",
    authDomain: "clone-9d8e4.firebaseapp.com",
    projectId: "clone-9d8e4",
    storageBucket: "clone-9d8e4.appspot.com",
    messagingSenderId: "330736488344",
    appId: "1:330736488344:web:a0a712126fe8e9d0d1e5ed"
};


const app = firebase.initializeApp(firebaseConfig); // Initialize Firebase
const db = app.firestore(); // create the database for
const auth = firebase.auth(); // create authentication
const storage = firebase.storage(); // create storage


export {db,auth,storage}