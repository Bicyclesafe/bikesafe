import {app} from '../src/index'
import supertest from 'supertest'
import {sequelize} from '../src/util/db'

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
      .get('/api/coordinates')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

afterAll(async () => {
    await sequelize.close()
})
