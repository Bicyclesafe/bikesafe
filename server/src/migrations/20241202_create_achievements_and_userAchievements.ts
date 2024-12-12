import { DataTypes } from 'sequelize'
import { Migration } from '../util/db'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('achievements', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
  })

  await queryInterface.createTable('user_achievements', {
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
    achievement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'achievements',
        },
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('achievements')
  await queryInterface.dropTable('user_achievements')
}