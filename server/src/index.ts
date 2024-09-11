import 'express-async-errors'
import express from 'express'
import { connectToDatabase } from './util/db'
import { PORT } from './util/config'
import { errorHandler } from './util/middleware'
import cors from 'cors'
const app = express()

import coordinatesRouter from './routes/coordinatesRoute'

app.use(express.json())
app.use(cors())

app.use('/api/coordinates', coordinatesRouter)

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const start = async (): Promise<void> => {
  try {
    await connectToDatabase()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

start().catch((error) => {
  console.error("Unhandled error on server startup:", error)
})

app.use(errorHandler)