import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config'

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env')
}

export const sequelize = new Sequelize(DATABASE_URL)

export const connectToDatabase = async (): Promise<void | null> => {
  try {
    await sequelize.authenticate()
    console.log('Connected to database')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  return null
}