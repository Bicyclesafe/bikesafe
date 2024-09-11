// const { Model, DataTypes } = require('sequelize')
// const { sequelize } = require('../util/db')
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db'

class Coordinate extends Model {}

Coordinate.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'coordinate'
})

Coordinate.sync().catch((error) => {
  console.error(error)
})

// module.exports = Coordinate
export { Coordinate }