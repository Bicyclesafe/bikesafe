import { app } from "../src/app"
import supertest from "supertest"
import { migrator, sequelize } from "../src/util/db"
import { User } from "../src/models/user"
import admin from "firebase-admin"

jest.mock("firebase-admin", () => {
  return {
    auth: jest.fn().mockReturnValue({
      verifyIdToken: jest.fn(),
    }),
    initializeApp: jest.fn()
  }
})

const api = supertest(app)

let mockVerifyIdToken: jest.Mock
let validToken: string
const mockDecodedToken = {
  uid: "123"
}

beforeAll(async () => {
  await migrator.up()
  validToken = "mockValidFirebaseToken"
})

beforeEach(async () => {
  mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock
  mockVerifyIdToken.mockResolvedValue(mockDecodedToken)
})

afterEach(async () => {
  await User.truncate({ cascade: true, restartIdentity: true })
})

describe("POST /api/users", () => {
    test("User is added to datbase",async () => {
        await api
            .post("/api/users")
            .set("Authorization", `Bearer ${validToken}`)
            .send({uid: "123", role: "user"})
            .expect(201)
    })

    test("User is not added if already exists",async () => {
        await api
            .post("/api/users")
            .set("Authorization", `Bearer ${validToken}`)
            .send({uid: "123", role: "user"})
            .expect(201)
        await api
            .post("/api/users")
            .set("Authorization", `Bearer ${validToken}`)
            .send({uid: "123", role: "user"})
            .expect(200)
    })
  
    test("Return Unauthorized if access token is invalid",async () => {
      mockVerifyIdToken.mockImplementation(() => {
        throw new Error("Invalid token")
      })
  
      await api
      .post("/api/users")
      .set("Authorization", `Bearer invalidToken`)
      .send({uid: "123", role: "user"})
      .expect(401)
    })
  
    test("Return Unauthorized when access token not given", async () => {
      await api
        .post("/api/users")
        .send({uid: "123", role: "user"})
        .expect(401)
    })
  
  })


afterAll(async () => {
    await sequelize.close()
  })