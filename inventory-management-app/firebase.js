import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsHzBmDn5eczjL0PcUEejl1xL6uWkyy2A",
    authDomain: "ai-pantry-ca433.firebaseapp.com",
    projectId: "ai-pantry-ca433",
    storageBucket: "ai-pantry-ca433.appspot.com",
    messagingSenderId: "735352756375",
    appId: "1:735352756375:web:b3b0375cfb644f6451f1d2",
    measurementId: "G-Z9WNTH2GLN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
