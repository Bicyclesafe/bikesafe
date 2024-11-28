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
  {
    userId: 1,
    startTime: new Date("2023-01-03 15:10:10+02"),
    endTime: new Date("2023-01-03 16:10:10+02"),
    tripDistance: 250
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
  await migrator.up()
  validToken = "mockValidFirebaseToken"
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
    expect(response.body).toHaveLength(3)
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
    expect(response.body).toBe(850)
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

describe("GET /api/trips/sum-date-range", () => {
  test("yearly distance is returned as JSON",async () => {
    await api
    .get("/api/trips/sum-date-range?startTime=2024-11-13+10:15:00&endTime=2024-11-13+10:15:00")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct yearly distance is returned",async () => {
    const response = await api
    .get("/api/trips/sum-date-range?startTime=2023-01-01+00:00:00&endTime=2023-12-31+23:59:59")
    .set("Authorization", `Bearer ${validToken}`)
    .expect(200)
    expect(response.body).toBe(250)
  })

  test("Zero is returned if no dates found between given dates", async () => {
    const response = await api
      .get("/api/trips/sum-date-range?startTime=2022-01-01+00:00:00&endTime=2022-12-31+23:59:59")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)
    expect(response.body).toBe(null)
  })

  test("Return Unauthorized if access token is invalid",async () => {
    mockVerifyIdToken.mockImplementation(() => {
      throw new Error("Invalid token")
    })

    await api
    .get("/api/trips/sum-date-range?startTime=2022-01-01+00:00:00&endTime=2022-12-31+23:59:59")
    .set("Authorization", `Bearer invalidToken`)
    .expect(401)
  })

  test("Return Unauthorized when access token not given", async () => {
    await api
      .get("/api/trips/sum-date-range?startTime=2022-01-01+00:00:00&endTime=2022-12-31+23:59:59")
      .expect(401)
  })
})

describe("GET /api/trips/all-users", () => {
  test("returns 0 if there is not commutes today",async () => {
    const response = await api
      .get("/api/trips/all-users?startTime=2024-11-26+00:00:00&endTime=2024-11-26+23:59:59")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)
    expect(response.body).toBe(0)
  })

  test("returns the number of commutes given a day", async () => {
    const response = await api
      .get("/api/trips/all-users?startTime=2024-01-03+00:00:00&endTime=2024-01-03+23:59:59")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)
    expect(response.body).toBe(1)

    const response_2 = await api
      .get("/api/trips/all-users?startTime=2023-01-03+00:00:00&endTime=2023-01-03+23:59:59")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)
    expect(response_2.body).toBe(2)
  })

  test("doesn't count multiple for a single user", async () => {
    const response = await api
      .get("/api/trips/all-users?startTime=2024-01-03+00:00:00&endTime=2024-01-03+23:59:59")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200)
    expect(response.body).toBe(1)
  })
})



afterAll(async () => {
  await sequelize.close()
})
