import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBtJ08QMrHy9sf4qlyP5Y5EV-cz5V5lluc",
    authDomain: "bakso-pilus-web.firebaseapp.com",
    databaseURL: "https://bakso-pilus-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bakso-pilus-web",
    storageBucket: "bakso-pilus-web.appspot.com",
    messagingSenderId: "774178534646",
    appId: "1:774178534646:web:e794d97b82b8a15987a8d7",
    measurementId: "G-8KJ4Z5RRMC"
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage }