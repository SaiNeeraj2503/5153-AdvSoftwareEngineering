import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyBmcz2hcsAtRD_NztXc2Iq09Etgza9GTLs",
	authDomain: "mcc-e06c3.firebaseapp.com",
	projectId: "mcc-e06c3",
	storageBucket: "mcc-e06c3.appspot.com",
	messagingSenderId: "145047817469",
	appId: "1:145047817469:web:2ff747d98b05efb4abc294",
	measurementId: "G-660THECH1T"
  };

const FirebaseApp = initializeApp(firebaseConfig);

export  { FirebaseApp, firebaseConfig };
