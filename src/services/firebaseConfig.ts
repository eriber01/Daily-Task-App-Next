

import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

console.log('process.env: ', `"${process.env}"`);


//user and pass
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
//google
const googleProvider = new GoogleAuthProvider()
//github
const githubProvider = new GithubAuthProvider()
//real time database
const database = getFirestore(app)

export { auth, googleProvider, githubProvider, database }



























