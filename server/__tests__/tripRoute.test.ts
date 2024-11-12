import { app } from "../src/app"
import supertest from "supertest"
import { migrator, sequelize } from "../src/util/db"
import { User } from "../src/models/user"
import { Trip } from "../src/models/trip"
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
  {
    uid: "456",
    role: "user"
  }
]

const initialTrips = [
  {
    userId: 1,
    startTime: new Date(),
    endTime: new Date(),
    tripDistance: 100
  },
  {
    userId: 1,
    startTime: new Date("2023-01-03 15:10:10+02"),
    endTime: new Date("2023-01-03 16:10:10+02"),
    tripDistance: 250
  },
  {
    userId: 2,
    startTime: new Date(),
    endTime: new Date(),
    tripDistance: 300
  },
  {
    userId: 2,
    startTime: new Date("2023-01-03 15:10:10+02"),
    endTime: new Date("2023-01-03 16:10:10+02"),
    tripDistance: 320
  },
]

let mockVerifyIdToken: jest.Mock
let validToken: string
const mockDecodedToken = {
  uid: "123"
}

beforeAll(async () => {
  await migrator.up();
  validToken = "mockValidFirebaseToken";
})

beforeEach(async () => {
  await User.bulkCreate(initialUsers)
  await Trip.bulkCreate(initialTrips)
  mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock
  mockVerifyIdToken.mockResolvedValue(mockDecodedToken)
})

afterEach(async () => {
  await User.truncate({ cascade: true, restartIdentity: true })
  await Trip.truncate({ cascade: true, restartIdentity: true })
})

describe("GET /api/trips", () => {
  test("Trips are returned as JSON",async () => {
    await api
    .get("/api/trips")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct amount of trips are returned",async () => {
    const response = await api.get("/api/trips").set("Authorization", `Bearer ${validToken}`).expect(200)
    expect(response.body).toHaveLength(2)
  })

  test("Correct format of trips are returned",async () => {
    const response = await api.get("/api/trips").set("Authorization", `Bearer ${validToken}`).expect(200)
    const trip = response.body[0]
    expect(trip.userId).toBe(1)
    expect(typeof trip.startTime).toBe("string")
    expect(new Date(trip.startTime).toString()).not.toBe("Invalid Date")
    expect(typeof trip.endTime).toBe("string")
    expect(new Date(trip.endTime).toString()).not.toBe("Invalid Date")
    expect(trip.tripDistance).toBe(100)
  })

  test("Only returns trips for correct user",async () => {
    const response = await api.get("/api/trips").set("Authorization", `Bearer ${validToken}`).expect(200)
    for (const trip of response.body) {
      expect(trip.userId).toBe(1)
    }
  })

  test("Return Unauthorized if access token is invalid",async () => {
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error("Invalid token")
    })

    await api
    .get("/api/trips")
    .set("Authorization", `Bearer invalidToken`)
    .expect(401)
  })

  test("Return Unauthorized when access token not given", async () => {
    await api
      .get("/api/trips")
      .expect(401)
  })

})



describe("GET /api/trips/total-distance", () => {
  test("total distance is returned as JSON",async () => {
    await api
    .get("/api/trips/total-distance")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct total distance is returned",async () => {
    const response = await api
    .get("/api/trips/total-distance")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    expect(response.body).toBe(350)
  })

  test("Return Unauthorized if access token is invalid",async () => {
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error("Invalid token")
    })

    await api
    .get("/api/trips/total-distance")
    .set("Authorization", `Bearer invalidToken`)
    .expect(401)
  })

  test("Return Unauthorized when access token not given", async () => {
    await api
      .get("/api/trips/total-distance")
      .expect(401)
  })
})

describe("GET /api/trips/yearly-distance/:year", () => {
  test("yearly distance is returned as JSON",async () => {
    await api
    .get("/api/trips/yearly-distance/2023")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct yearly distance is returned",async () => {
    const response = await api
    .get("/api/trips/yearly-distance/2023")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    expect(response.body).toBe(250)
  })

  test("Return Unauthorized if access token is invalid",async () => {
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error("Invalid token")
    })

    await api
    .get("/api/trips/yearly-distance/2023")
    .set("Authorization", `Bearer invalidToken`)
    .expect(401)
  })

  test("Return Unauthorized when access token not given", async () => {
    await api
      .get("/api/trips/yearly-distance/2023")
      .expect(401)
  })
})



afterAll(async () => {
  await sequelize.close()
})
