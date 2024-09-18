import { app } from '../src/index'
import supertest from 'supertest'
import { sequelize } from '../src/util/db'
import { Coordinate } from '../src/models/coordinate'

const api = supertest(app)

const initialCoordinates = [
    {
        "id": 1,
        "lat": 50,
        "lng": 60
    },
    {
        "id": 2,
        "lat": 10,
        "lng": 20
    }
]

beforeEach(async () => {
    await Coordinate.drop()
    await Coordinate.sync()

    await Coordinate.create(initialCoordinates[0])
    await Coordinate.create(initialCoordinates[1])
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

afterAll(async () => {
    await sequelize.close()
})