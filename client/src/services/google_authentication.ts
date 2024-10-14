import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"

const provider = new GoogleAuthProvider()

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
})

const requiredEnvVariables = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGE_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID'
]

export const checkEnvVariables = () => {
  const missingVariables = requiredEnvVariables.filter((variable) => !import.meta.env[variable]);

  if (missingVariables.length > 0) {
    throw new Error(`Missing the following environment variables: ${missingVariables.join(', ')}`);
  }
}

checkEnvVariables()

const auth = getAuth(app)

export { provider, auth }