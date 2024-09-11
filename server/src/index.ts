import express from 'express'
import { connectToDatabase } from './util/db'
const app = express()
var cors = require('cors')

const coordinatesRouter = require('./routes/coordinatesRoute.ts')

app.use(express.json())
app.use(cors())

app.use('/api/coordinates', coordinatesRouter)

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3000;

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()