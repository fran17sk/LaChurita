import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBGT0DqO1RauvMyfF_m1-BdZkB0yGASJaQ",
    authDomain: "lachuritacerrillos.firebaseapp.com",
    projectId: "lachuritacerrillos",
    storageBucket: "lachuritacerrillos.appspot.com",
    messagingSenderId: "947739808869",
    appId: "1:947739808869:web:17b3650ad5c0db03bea28c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)