import { Sequelize } from 'sequelize-typescript'
import { DATABASE_URL } from './config'
import { Coordinate } from '../models/coordinate'
import { BikeTheft } from '../models/bikeTheft'
import { LockStation } from '../models/lockStation'

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env')
}

export const sequelize = new Sequelize(DATABASE_URL, {
  models: [Coordinate, BikeTheft, LockStation],
  logging: process.env.NODE_ENV !== 'test',
})

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    console.log('Database synchronized')
  }).catch(error => {
    console.error('Error synchronizing database:', error)
  })
}

export const connectToDatabase = async (): Promise<void | null> => {
  try {
    await sequelize.authenticate()
    console.log('Connected to database')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  return null
}