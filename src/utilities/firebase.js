import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAbMZjhudH1N7NKpbnyZ5KYao9f5hdptMs",
  authDomain: "quick-react-59f8f.firebaseapp.com",
  databaseURL: "https://quick-react-59f8f-default-rtdb.firebaseio.com",
  projectId: "quick-react-59f8f",
  storageBucket: "quick-react-59f8f.appspot.com",
  messagingSenderId: "139883046064",
  appId: "1:139883046064:web:257480a52afd99f6e94775",
  measurementId: "G-HZZ3RELLMG"
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase); // changed 'app' to 'firebase'
const firestore = getFirestore(firebase);

export const updateDbDocument = async (collection, docId, data) => {
  const docRef = doc(firestore, collection, docId);
  await updateDoc(docRef, data);
};

export const setDbDocument = async (collection, docId, data) => {
  const docRef = doc(firestore, collection, docId);
  await setDoc(docRef, data);
};

export default firebase;