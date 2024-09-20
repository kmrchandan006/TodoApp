import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  
  apiKey: "AIzaSyA7xzKDyTmlHekQJ93--vJhVfbZf8BcH2Y",
  authDomain: "my-app-49ce9.firebaseapp.com",
  projectId: "my-app-49ce9",
  storageBucket: "my-app-49ce9.appspot.com",
  messagingSenderId: "450398446287",
  appId: "1:450398446287:web:c2bb58d31a618ca9264dba",
  measurementId: "G-S7KX68J1R9",

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db} 