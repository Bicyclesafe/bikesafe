import express from 'express'
//import data from './data.json'
import { connectToDatabase } from './db'
import Coordinate from "./coordinate"
const app = express()
app.use(express.json())
import cors from 'cors'

app.use(cors())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

app.get('/coordinates', async (_req, res) => {
  const coordinates = await Coordinate.findAll()
  res.json(coordinates)
})