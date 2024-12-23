import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('companies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('companies')
}