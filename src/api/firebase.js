import { initializeApp } from "firebase/app";
import { getAuth, browserSessionPersistence, setPersistence, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

setPersistence(auth,browserSessionPersistence).catch((error) => {console.error(error)});

export async function login() {
  signInWithPopup(auth,provider).catch((error) => console.error(error));
}

export async function logout() {
    signOut(auth).catch((error) => console.error(error));
}

export async function onUserStateChanged(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}