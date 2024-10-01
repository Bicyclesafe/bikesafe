import 'express-async-errors'
import express from 'express'
import { connectToDatabase } from './util/db'
import { PORT } from './util/config'
import { errorHandler } from './util/middleware'
import cors from 'cors'
export const app = express()

import coordinatesRouter from './routes/coordinatesRoute'
import bikeTheftRouter from './routes/bikeTheftRoute'
import lockStationRouter from './routes/lockStationRoute'
import testingRouter from './routes/testingRoute'
// import { getAllLockStations } from './services/lockStationService'

app.use(express.json())
app.use(cors())

app.use('/api/coordinates', coordinatesRouter)
app.use('/api/bike_thefts', bikeTheftRouter)
app.use('/api/lock_stations', lockStationRouter)

app.use('/testing', testingRouter)


app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const start = async (): Promise<void> => {
  try {
    await connectToDatabase()
    if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })}

  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

// getAllLockStations().catch((error) => { console.error(error) })

start().catch((error) => {
  console.error("Unhandled error on server startup:", error)
})

app.use(errorHandler)