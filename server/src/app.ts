import 'express-async-errors'
import express from 'express'
import { errorHandler, tokenVerification } from './util/middleware'
import cors from 'cors'

import coordinatesRouter from './routes/coordinatesRoute'
import bikeTheftRouter from './routes/bikeTheftRoute'
import lockStationRouter from './routes/lockStationRoute'
import tripRouter from './routes/tripRoute'
import testingRouter from './routes/testingRoute'
import userRouter from './routes/userRoute'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(tokenVerification)

app.use('/api/coordinates', coordinatesRouter)
app.use('/api/bike_thefts', bikeTheftRouter)
app.use('/api/lock_stations', lockStationRouter)
app.use('/api/trips', tripRouter)
app.use('/api/users', userRouter)

app.use('/testing', testingRouter)

app.use(errorHandler)
