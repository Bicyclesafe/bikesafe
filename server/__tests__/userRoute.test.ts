import { app } from "../src/app"
import supertest from "supertest"
import { migrator, sequelize } from "../src/util/db"
import { User } from "../src/models/user"
import { Trip } from "../src/models/trip"

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
    startTime: new Date(),
    endTime: new Date(),
    tripDistance: 250
  },
  {
    userId: 2,
    startTime: new Date(),
    endTime: new Date(),
    tripDistance: 300
  }
]

beforeAll(async () => {
  await migrator.up()
})

beforeEach(async () => {
  await User.bulkCreate(initialUsers)
  await Trip.bulkCreate(initialTrips)
})

afterEach(async () => {
  await User.truncate({ cascade: true, restartIdentity: true })
  await Trip.truncate({ cascade: true, restartIdentity: true })
})

describe("GET /api/users/:uid/trips", () => {
  test("Trips are returned as JSON",async () => {
    await api
    .get("/api/users/123/trips")
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct amount of trips are returned",async () => {
    const response = await api.get("/api/users/123/trips").expect(200)
    expect(response.body).toHaveLength(2)
  })

  test("Correct format of trips are returned",async () => {
    const response = await api.get("/api/users/123/trips").expect(200)
    const trip = response.body[0]
    expect(trip.userId).toBe(1)
    expect(typeof trip.startTime).toBe("string")
    expect(new Date(trip.startTime).toString()).not.toBe("Invalid Date")
    expect(typeof trip.endTime).toBe("string")
    expect(new Date(trip.endTime).toString()).not.toBe("Invalid Date")
    expect(trip.tripDistance).toBe(100)
  })

  test("Only returns trips for correct user",async () => {
    const response = await api.get("/api/users/123/trips").expect(200)
    for (const trip of response.body) {
      expect(trip.userId).toBe(1)
    }
  })

  test("Return error if user does not exist",async () => {
    await api
    .get("/api/users/999/trips")
    .expect(500)
  })

})



describe("GET /api/users/:uid/total-distance", () => {
  test("total distance is returned as JSON",async () => {
    await api
    .get("/api/users/123/total-distance")
    .expect(200)
    .expect("Content-Type", /application\/json/) 
  })

  test("Correct total distance is returned",async () => {
    const response = await api
    .get("/api/users/123/total-distance")
    .expect(200)
    expect(response.body).toBe(350)
  })

  test("Return error if user does not exist",async () => {
    await api
    .get("/api/users/999/total-distance")
    .expect(500)
  })
})

afterAll(async () => {
  await sequelize.close()
})
