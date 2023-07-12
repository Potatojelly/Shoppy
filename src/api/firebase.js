import { initializeApp } from "firebase/app";
import { getAuth, 
        browserSessionPersistence, 
        setPersistence, 
        signOut, 
        signInWithPopup, 
        GoogleAuthProvider, 
        onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

setPersistence(auth,browserSessionPersistence).catch((error) => {console.error(error)});

export async function login() {
  signInWithPopup(auth,provider).catch((error) => console.error(error));
}

export async function logout() {
    signOut(auth).catch((error) => console.error(error));
}

export async function onUserStateChanged(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user) {
    return get(ref(database), "admins")
        .then ((snapshot)=>{
            if(snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.admins.includes(user.uid)
                console.log(isAdmin);
                return {...user, isAdmin};
            }
            return user;
        })
}