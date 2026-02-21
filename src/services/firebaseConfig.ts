import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDp_1VUsF5ZRoNakvEmO-Bj9WbxzYnunTE',
  authDomain: 'personal-portfolio-89838.firebaseapp.com',
  databaseURL: 'https://personal-portfolio-89838-default-rtdb.firebaseio.com',
  projectId: 'personal-portfolio-89838',
  storageBucket: 'personal-portfolio-89838.firebasestorage.app',
  messagingSenderId: '117593232096',
  appId: '1:117593232096:web:06962b13cab235e9fa3685',
  measurementId: 'G-TCYEKD87SE',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);

export { app, analytics, auth, database };
