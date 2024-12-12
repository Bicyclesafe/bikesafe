import { app } from "../src/app"
import supertest from "supertest"
import { migrator, sequelize } from "../src/util/db"
import { User } from "../src/models/user"
import { Trip } from "../src/models/trip"
import { Achievement } from "../src/models/achievement"
import { UserAchievement } from "../src/models/userAchievement"
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
  
const initialUsers = [
    {
        uid: "123",
        role: "admin"
    },
]

const initialTrips = [
    {
      userId: 1,
      startTime: new Date("2024-01-03 15:10:10+02"),
      endTime: new Date("2024-01-03 16:10:10+02"),
      tripDistance: 100
    },
    {
      userId: 1,
      startTime: new Date("2024-01-03 9:10:10+02"),
      endTime: new Date("2024-01-03 10:10:10+02"),
      tripDistance: 500
    },
  ]

const initialAchievements = [
    {
        name: "First trip",
        description: "First trip completed",
        requirement: 1,
        groupId: 1,
        level: 1,
    },
    {
        name: "Second trip",
        description: "Second trip completed",
        requirement: 2,
        groupId: 1,
        level: 2,
    },
    {
        name: "Third trip",
        description: "Third trip completed",
        requirement: 3,
        groupId: 1,
        level: 3,
    }
  ]

const initialUserAchievements = [
    {
        userId: 1,
        achievementId: 1,
        level: 1,
    }
]

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
    await User.bulkCreate(initialUsers)
    await Trip.bulkCreate(initialTrips)
    await Achievement.bulkCreate(initialAchievements)
    await UserAchievement.bulkCreate(initialUserAchievements)
    mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock
    mockVerifyIdToken.mockResolvedValue(mockDecodedToken)
  })
  
  afterEach(async () => {
    await User.truncate({ cascade: true, restartIdentity: true })
    await Trip.truncate({ cascade: true, restartIdentity: true })
    await Achievement.truncate({ cascade: true, restartIdentity: true })
    await UserAchievement.truncate({ cascade: true, restartIdentity: true })
  })

describe("GET /api/achievements", () => {
    test("returns all achievements", async () => {
        const achievements = await api
            .get("/api/achievements")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
        expect(achievements.body).toHaveLength(initialAchievements.length)
    })
    
    test("achievements returned are correct", async () => {
        const achievements = await api
            .get("/api/achievements")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
        expect(achievements.body[0].name).toBe("First trip")
        expect(achievements.body[0].description).toBe("First trip completed")
        expect(achievements.body[0].requirement).toBe(1)
        expect(achievements.body[0].groupId).toBe(1)
        expect(achievements.body[0].level).toBe(1)
        expect(achievements.body[1].name).toBe("Second trip")
        expect(achievements.body[2].name).toBe("Third trip")
    })

    test("Return Unauthorized if access token is invalid",async () => {
        mockVerifyIdToken.mockImplementation(() => {
          throw new Error("Invalid token")
        })
    
        await api
        .get("/api/achievements")
        .set("Authorization", `Bearer invalidToken`)
        .expect(401)
      })
    
      test("Return Unauthorized when access token not given", async () => {
        await api
          .get("/api/achievements")
          .expect(401)
      })
})

describe("GET /api/achievements/completed", () => {
    test("returns all achievements for user", async () => {
        const achievements = await api
            .get("/api/achievements/completed")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
        expect(achievements.body).toHaveLength(1)
    })

    test("Return Unauthorized if access token is invalid",async () => {
        mockVerifyIdToken.mockImplementation(() => {
          throw new Error("Invalid token")
        })
    
        await api
        .get("/api/achievements/completed")
        .set("Authorization", `Bearer invalidToken`)
        .expect(401)
      })
    
    test("Return Unauthorized when access token not given", async () => {
        await api
          .get("/api/achievements/completed")
          .expect(401)
      })
})

afterAll(async () => {
    await sequelize.close()
  })