import { app } from "../src/app"
import supertest from "supertest"
import { migrator, sequelize } from "../src/util/db"
import { User } from "../src/models/user"
import admin from "firebase-admin"
import { Goal } from "../src/models/goal"

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

const initialGoals = [
  {
    userId: 1,
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-01-06T23:59:59Z'),
    goalDistance: 100
  },
  {
    userId: 1,
    startTime: new Date('2024-01-07T00:00:00Z'),
    endTime: new Date('2024-01-13T23:59:59Z'),
    goalDistance: 250
  },
  {
    userId: 2,
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-01-06T23:59:59Z'),
    goalDistance: 300
  }
]

let mockVerifyIdToken: jest.Mock
let validToken: string
const mockDecodedToken = {
  uid: "123"
}

beforeAll(async () => {
  await migrator.up();
  validToken = "mockValidFirebaseToken";
  jest.useFakeTimers().setSystemTime(new Date('2024-01-05T12:00:00Z'))
})

beforeEach(async () => {
  await User.bulkCreate(initialUsers)
  await Goal.bulkCreate(initialGoals)
  mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock
  mockVerifyIdToken.mockResolvedValue(mockDecodedToken)
})

afterEach(async () => {
  await User.truncate({ cascade: true, restartIdentity: true })
  await Goal.truncate({ cascade: true, restartIdentity: true })
})

describe("GET /api/goals", () => {
  test("Goals are returned as JSON",async () => {
    await api
    .get("/api/goals")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct amount of goals are returned",async () => {
    const response = await api.get("/api/goals").set("Authorization", `Bearer ${validToken}`).expect(200)
    expect(response.body).toHaveLength(2)
  })

  test("Correct format of goals are returned",async () => {
    const response = await api.get("/api/goals").set("Authorization", `Bearer ${validToken}`).expect(200)
    const goal = response.body[0]
    expect(goal.userId).toBe(1)
    expect(typeof goal.startTime).toBe("string")
    expect(new Date(goal.startTime).toString()).not.toBe("Invalid Date")
    expect(typeof goal.endTime).toBe("string")
    expect(new Date(goal.endTime).toString()).not.toBe("Invalid Date")
    expect(goal.goalDistance).toBe(100)
  })

  test("Only returns goals for correct user",async () => {
    const response = await api.get("/api/goals").set("Authorization", `Bearer ${validToken}`).expect(200)
    for (const goal of response.body) {
      expect(goal.userId).toBe(1)
    }
  })

  test("Return Unauthorized if access token is invalid",async () => {
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error("Invalid token")
    })

    await api
    .get("/api/goals")
    .set("Authorization", `Bearer invalidToken`)
    .expect(401)
  })

  test("Return Unauthorized when access token not given", async () => {
    await api
      .get("/api/goals")
      .expect(401)
  })
})

describe("GET /api/goals/current", () => {
  test("Current goal is returned as JSON", async () => {
    await api
    .get("/api/goals/current")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)
  })

  test("Correct current goal is returned", async () => {
    const response = await api
    .get("/api/goals/current")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    const currentGoal = response.body[0]
    expect(currentGoal.goalDistance).toBe(100)
  })

  test("Return Unauthorized if access token is invalid",async () => {
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error("Invalid token")
    })

    await api
    .get("/api/goals/current")
    .set("Authorization", `Bearer invalidToken`)
    .expect(401)
  })

  test("Return Unauthorized when access token not given", async () => {
    await api
      .get("/api/goals/current")
      .expect(401)
  })
})

afterAll(async () => {
  await sequelize.close()
  jest.useRealTimers()
})
