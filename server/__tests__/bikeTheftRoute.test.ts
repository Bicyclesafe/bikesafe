import { app } from '../src/app'
import supertest from 'supertest'
import { sequelize } from '../src/util/db'
import { BikeTheft } from '../src/models/bikeTheft'
import { Coordinate } from '../src/models/coordinate'
import { migrator } from '../src/util/db'
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

const initialCoordinates = [
    {
        lat: 50,
        lng: 60
    },
    {
        lat: 10,
        lng: 20
    }
]

let mockVerifyIdToken: jest.Mock
let validToken: string
const mockDecodedToken = {
  uid: "123"
}

beforeAll(async () => {
    await migrator.up()
})

beforeEach(async () => {
    const coordinates = await Coordinate.bulkCreate(initialCoordinates)
    const bikeThefts = [
        {coordinateId: coordinates[0].id},
        {coordinateId: coordinates[1].id}
    ]
    await BikeTheft.bulkCreate(bikeThefts)
    mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock
    mockVerifyIdToken.mockResolvedValue(mockDecodedToken)
})

afterEach(async () => {
    await Coordinate.truncate({ cascade: true, restartIdentity: true })
    await BikeTheft.truncate({ cascade: true, restartIdentity: true })
})

describe("GET /api/bike_thefts", () => {
    test('Bike_thefts are returned as json', async () => {
        await api
          .get('/api/bike_thefts')
          .set("Authorization", `Bearer ${validToken}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('Bike_thefts are returned in correct format.', async () => {
        const response = await api
            .get('/api/bike_thefts')
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)

        const bike_theft = response.body[0]
        console.log(bike_theft)
        expect(bike_theft.id).toBe(1)
        expect(bike_theft.coordinateId).toBe(1)
        expect(bike_theft.coordinate).toEqual({id: 1, lat: 50, lng:60})
        
    })

    test("Returns correct amount of bike_thefts.", async () => {
        const response = await api
            .get("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)

        expect(response.body).toHaveLength(initialCoordinates.length)
    })

})

describe("POST /api/bike_thefts", () => {
    test('Bike_theft is added to database.', async () => {
        
        const newCoordinate = {
            lat: 69,
            lng: 55
        }
        
        await api
            .post("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .send(newCoordinate)
            .expect(201)

        const bikeTheftResponse = await api
            .get("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)

        expect(bikeTheftResponse.body).toHaveLength(initialCoordinates.length + 1)
    })

    test("Posting bike theft with invalid coordinate responds with error", async () => {
        const newCoordinate = {
            lat: 69
        }

        await api
            .post("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .send(newCoordinate)
            .expect(400)
    })

    test("Invalid bike theft is not added to database", async () => {
        const newCoordinate = {
            lat: "Latitude that is not a number",
            lng: "Longitude that is not a number"
        }

        await api
            .post("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .send(newCoordinate)
            .expect(400)

        const response = await api
            .get("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)

        expect(response.body).toHaveLength(initialCoordinates.length)
    })
})

describe("DELETE /api/bike_thefts/:id", () => {
    test('Bike_theft is deleted from db', async () => {

        const bikeTheftsBefore = await api
            .get("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
        expect(bikeTheftsBefore.body.length).toBe(2)
        
        await api
            .delete("/api/bike_thefts/1")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(204)

        const bikeTheftsAfter = await api
            .get("/api/bike_thefts")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
        
        expect(bikeTheftsAfter.body.length).toBe(1)
        expect(bikeTheftsAfter.body[0].coordinateId).toBe(2)
        expect(bikeTheftsAfter.body[0].coordinate).toEqual({id: 2, lat:10, lng:20})
    })

    test('Invalid delete api call does not work', async() => {
        await api
            .delete("/api/bike_thefts/invalid")
            .set("Authorization", `Bearer ${validToken}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(async () => {
    await sequelize.close()
})