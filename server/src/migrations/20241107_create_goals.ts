import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.createTable('goals', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      goal_distance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      }
    })
  }

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('goals')
}
  