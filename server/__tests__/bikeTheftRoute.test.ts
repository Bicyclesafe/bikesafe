import { app } from '../src/index'
import supertest from 'supertest'
import { sequelize } from '../src/util/db'
import { Coordinate } from '../src/models/coordinate'
import { BikeTheft } from '../src/models/bikeTheft'

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
    const coordinates = await Coordinate.bulkCreate(initialCoordinates)
    const bikeThefts = [
        {coordinateId: coordinates[0].id},
        {coordinateId: coordinates[1].id}
    ]
    await BikeTheft.bulkCreate(bikeThefts)
})

describe("GET /api/bike_thefts", () => {
    test('Bike_thefts are returned as json', async () => {
        await api
          .get('/api/bike_thefts')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('Bike_thefts are returned in correct format.', async () => {
        const response = await api.get('/api/bike_thefts').expect(200)
        const bike_theft = response.body[0]
        
        expect(bike_theft.id).toBe(1)
        expect(bike_theft.coordinateId).toBe(1)
        expect(bike_theft.coordinate).toEqual({id: 1, lat: 50, lng:60})
        
    })

    test("Returns correct amount of bike_thefts.", async () => {
        const response = await api.get("/api/bike_thefts").expect(200)

        expect(response.body).toHaveLength(initialCoordinates.length)
    })

})

describe("POST /api/bike_thefts", () => {
    test('Bike_theft is added to database.', async () => {
        
        const newCoordinate = {
            lat: 69,
            lng: 55
        }
        
        const response = await api
            .post("/api/coordinates")
            .send(newCoordinate)
            .expect(200)

        const newBikeTheft = {
            coordinateId: response.body.id
        }

        await api
            .post("/api/bike_thefts")
            .send(newBikeTheft)
            .expect(200)

        const bikeTheftResponse = await api
            .get("/api/bike_thefts")
            .expect(200)

        expect(bikeTheftResponse.body).toHaveLength(initialCoordinates.length + 1)
    })
})

afterAll(async () => {
    await sequelize.close()
})