const { DATABASE_URL } = require("./config")
const { Sequelize } = require('sequelize')

export const sequelize = new Sequelize(DATABASE_URL)

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to database')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  return null
}