import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("users", "uid", {
    type: DataTypes.STRING,
    allowNull: false
  })
  await queryInterface.removeColumn("users", "email")
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("users", "email", {
    type: DataTypes.STRING,
    allowNull: false
  })
  await queryInterface.removeColumn("users", "email")
}