//import { DataType } from 'sequelize'
import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Coordinate } from './coordinate'

@Table({
  tableName: 'bike_thefts',
  underscored: true,
  timestamps: false,
})
export class BikeTheft extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Coordinate)
  @Column
  coordinateId!: number

  @BelongsTo(() => Coordinate, { onDelete: 'CASCADE' })
  coordinate!: Coordinate
}