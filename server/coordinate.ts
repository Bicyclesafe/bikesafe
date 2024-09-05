const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('./db')

class Coordinate extends Model {}

Coordinate.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'coordinate'
})

module.exports = Coordinate