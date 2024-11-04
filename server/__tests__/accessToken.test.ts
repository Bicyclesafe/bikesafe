import { app } from '../src/app'
import supertest from 'supertest'

const api = supertest(app)
describe("POST /api/testi", () => {
    test('should return error if not logged in', async () => {
        await api
            .post('/api/testi')
            .send({data: "teasti"})
            .set('Authorization', `Bearer testitokeni`)
            .expect(500)
    })
})