import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'


export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  await queryInterface.createTable('trips', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trip_distance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  })
}



export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('trips')
  await queryInterface.dropTable('users')
}

