import * as firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import * as db from "firebase/database";
import * as auth from "firebase/auth";
//import 'firebase/database/dist/index.cjs.js';
//import "firebase/auth/dist/index.cjs.js";
// import dotenv from "dotenv";
// dotenv.config();



const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

//const app = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
//const database = db.getDatabase(app);
//const dbase = firebase.database()

export default app;

export {auth,db}