import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, update, onValue } from "firebase/database";

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
const database = getDatabase(firebase);

export const updateDbDocument = async (path, data) => {
    try {
      const dbRef = ref(database, path);
      await update(dbRef, data);
      console.log(`Updated ${path} successfully.`);
    } catch (error) {
      console.error("Failed to update document:", error);
      throw error;
    }
  };

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
            .then(() => setResult(makeResult()))
            .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};

export const setDbDocument = async (path, data) => {
  const dbRef = ref(database, path);
  await set(dbRef, data);
};

export const getDbDocument = async (path) => {
  const dbRef = ref(database, path);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error("No data available");
  }
};

export const useDbData = (path) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const dbRef = ref(database, path);
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

export const isAdmin = async (uid) => {
  const adminRef = ref(database, `admins/${uid}`);
  const snapshot = await get(adminRef);
  return snapshot.exists();
};

export default firebase;
export const auth = getAuth(firebase);