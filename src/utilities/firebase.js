import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";  // Added getDoc here
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from 'react';
import { ref, onValue, getDatabase } from "firebase/database";

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
const analytics = getAnalytics(firebase);
const firestore = getFirestore(firebase);

export const updateDbDocument = async (path, data) => {
    const dbRef = firebase.database().ref(path);
    await dbRef.update(data);
};

export const setDbDocument = async (collection, docId, data) => {
  const docRef = doc(firestore, collection, docId);
  await setDoc(docRef, data);
};

export const getDbDocument = async (path) => {
    const dbRef = firebase.database().ref(path);
    const snapshot = await dbRef.once('value');
    return snapshot.val();
};

export const useDbData = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const dbRef = ref(getDatabase(), path);
    const listener = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
    }, (err) => {
      setError(err);
    });
    
    return () => {
      listener();
    };
  }, [path]);
  
  return [data, error];
};

export default firebase;
