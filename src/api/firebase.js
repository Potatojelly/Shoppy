import { initializeApp } from "firebase/app";
import { getAuth, 
        browserSessionPersistence, 
        setPersistence, 
        signOut, 
        signInWithPopup, 
        GoogleAuthProvider, 
        onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set} from "firebase/database";
import {v4 as uuid} from "uuid";

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
        callback(user);
    });
}

export async function adminUser(user) {
    return get(ref(database,"admins"))
        .then ((snapshot)=>{
            if(snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid)
                return {...user, isAdmin};
            }
            return user;
        })
}

export async function checkUserUid(uid) {
    return get(ref(database,"users"))
        .then((snapshot)=>{
            if(snapshot.exists()) {
                const users = Object.keys(snapshot.val());
                console.log(users);
                const isUser = users.includes(uid)
                return isUser;
            }
            return false;
        })
}

export async function addUserUid(uid) {
    set(ref(database,`users/${uid}`),{carts: ""});
} 

export async function addNewProduct(product,url) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id : id,
        price: parseInt(product.price),
        image: url,
        options: product.options.split(",").map((item)=>item.toUpperCase()),
        stock: parseInt(product.stock),
    });
}

export async function getProducts() {
    return get(ref(database,"products"))
        .then ((snapshot)=>{
            if(snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            return [];
        })

}

// export async function addCart() {
//     return set(ref(database,`users/${uid}`),)
// }