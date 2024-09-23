import { app } from '../src/index'
import supertest from 'supertest'
import { sequelize } from '../src/util/db'
import { Coordinate } from '../src/models/coordinate'

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

beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Coordinate.bulkCreate(initialCoordinates)
})

describe("GET /api/coordinates", () => {
    test('Coordinates are returned as json', async () => {
        await api
          .get('/api/coordinates')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('Coordinates are returned in correct format.', async () => {
        const response = await api.get('/api/coordinates').expect(200)
        const coordinate = response.body[0]
        
        expect(coordinate.id).toBe(1)
        expect(coordinate.lat).toBe(50)
        expect(coordinate.lng).toBe(60)
    })

    test("Returns correct amount of coordinates.", async () => {
        const response = await api.get("/api/coordinates").expect(200)

        expect(response.body).toHaveLength(initialCoordinates.length)
    })
})

describe("GET /api/coordinates/:id", () => {
    test('Coordinate is returned as json', async () => {
        await api
          .get('/api/coordinates/1')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('Coordinate is returned in correct format.', async () => {
        const response = await api.get('/api/coordinates/1').expect(200)
        const coordinate = response.body
        
        expect(coordinate.id).toBe(1)
        expect(coordinate.lat).toBe(50)
        expect(coordinate.lng).toBe(60)
    })
})

describe("POST /api/coordinates", () => {
    test('Coordinate is added to database.', async () => {
        const newCoordinate = {
            lat: 30,
            lng: 40
        }

        await api
            .post("/api/coordinates")
            .send(newCoordinate)
            .expect(200)

        const response = await api
            .get("/api/coordinates")
            .expect(200)

        expect(response.body).toHaveLength(initialCoordinates.length + 1)
    })
})

afterAll(async () => {
    await sequelize.close()
})