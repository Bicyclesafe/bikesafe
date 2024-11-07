import * as admin from 'firebase-admin'
import { FIREBASE_PROJECT_ID } from "./config"
//import { getAuth } from "firebase-admin/auth"

const app = admin.initializeApp({
  projectId: FIREBASE_PROJECT_ID
})

export const auth = admin.auth(app)