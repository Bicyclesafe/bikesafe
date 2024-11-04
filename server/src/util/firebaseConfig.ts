import * as admin from 'firebase-admin'
import { FIREBASE_PROJECT_ID } from "./config"
import { getAuth } from "firebase-admin/auth"

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
const app = admin.initializeApp({
  projectId: FIREBASE_PROJECT_ID
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const auth = getAuth(app)