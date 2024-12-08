import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'company_id', {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'companies',
      },
      key: 'id',
    },
    allowNull: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'company_id')
}