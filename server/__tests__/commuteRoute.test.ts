import { app } from '../src/app'
import supertest from 'supertest'
import { migrator, sequelize } from '../src/util/db'
import admin from "firebase-admin"
import { User } from '../src/models/user'
import { Commute } from '../src/models/commute'

jest.mock("firebase-admin", () => {
  return {
    auth: jest.fn().mockReturnValue({
      verifyIdToken: jest.fn(),
    }),
    initializeApp: jest.fn()
  }
})

const api = supertest(app)

const initialUsers = [
  {
    uid: "123",
    role: "admin"
  },
  {
    uid: "456",
    role: "user"
  }
]

let mockVerifyIdToken: jest.Mock
let validToken: string = "mockValidFirebaseToken"
const mockDecodedToken = {
  uid: "123"
}

beforeAll(async () => {
  await migrator.up()
})

beforeEach(async () => {
  const users = await User.bulkCreate(initialUsers)
  const initialCommutes = [
    {
      userId: users[1].id,
      distance: 50
    }
  ]
  await Commute.bulkCreate(initialCommutes)
  mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock
  mockVerifyIdToken.mockResolvedValue(mockDecodedToken)
})

afterEach(async () => {
  await User.truncate({ cascade: true, restartIdentity: true })
  await Commute.truncate({ cascade: true, restartIdentity: true })
})

describe("POST /api/commute", () => {
  test('Adds commute to database', async () => {
    await api
      .post('/api/commute')
      .set("Authorization", `Bearer ${validToken}`)
      .send({ distance: 10})
      .expect(201)
      
    const response = await api
      .get("/api/commute")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)

    expect(response.body).toBe(10)
  })

  test('Updates commute to database if one already exists', async () => {
    await api
      .post('/api/commute')
      .set("Authorization", `Bearer ${validToken}`)
      .send({ distance: 10})
      .expect(201)

    await api
      .post('/api/commute')
      .set("Authorization", `Bearer ${validToken}`)
      .send({ distance: 30})
      .expect(200)
      
    const response = await api
      .get("/api/commute")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)

    expect(response.body).toBe(30)
  })
})

afterAll(async () => {
  await sequelize.close()
})