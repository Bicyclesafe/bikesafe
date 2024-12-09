import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("achievements", "description", {
    type: DataTypes.STRING,
    allowNull: false
  })

  await queryInterface.removeColumn("achievements", "requirements")

  await queryInterface.addColumn("achievements", "requirement", {
    type: DataTypes.INTEGER,
    allowNull: false
  })

  await queryInterface.addColumn("achievements", "group_id", {
    type: DataTypes.INTEGER,
    allowNull: false
  })

  await queryInterface.addColumn("achievements", "level", {
    type: DataTypes.INTEGER,
    allowNull: false
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("achievements", "description")

  await queryInterface.addColumn("achievements", "requirements", {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  })

  await queryInterface.removeColumn("achievements", "requirement")
  await queryInterface.removeColumn("achievements", "group_id")
  await queryInterface.removeColumn("achievements", "level")
}