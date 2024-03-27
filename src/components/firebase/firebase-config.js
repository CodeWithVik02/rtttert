import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  }  from "firebase/auth";

//configure your own firebase config in this application
const firebaseConfig = {
  apiKey: "AIzaSyBlbZFABXwcWUJBzcC5oI98qSEDPjjNNuc",
  authDomain: "supliffyxzeta.firebaseapp.com",
  projectId: "supliffyxzeta",
  storageBucket: "supliffyxzeta.appspot.com",
  messagingSenderId: "9509703738",
  appId: "1:9509703738:web:790164ff4cdcf15e466503",
  measurementId: "G-YGXVCQH80V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appD = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const detachtAth = getAuth(appD)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export async function uploadPhotoAndStoreUrl(userId, file) {
  try {
    // Reference to the root directory of Firebase Storage
    const storageRef = ref(storage, 'photos/' + userId + '/' + file.name);

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef); // Corrected this line

    // Store download URL along with other data in Firestore collection
    const docRef = await addDoc(collection(db, 'photos'), {
      userId: userId,
      fileName: file.name,
      downloadURL: downloadURL,
      // You can add more fields as needed
    });

    console.log("Photo uploaded and URL stored with ID: ", docRef.id);
return downloadURL
  } catch (error) {
    console.error("Error uploading photo:", error);
  }
}


export const registerWithEmailAndPassword = async ( name, surname, email, password) => {
  try {
     await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await addDoc(collection(db, "Users"), {
      uid: user.uid,
      name:name,
      surname:surname,
      authProvider: "harryFultzProjects",
      email:email,
      type:"user",
    });
  } catch (err) {
    console.error(err);
  }
};
export const sendPasswordReset = async (auth, email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("request send");
  } catch (err) {
    console.error(err);
  }
};
