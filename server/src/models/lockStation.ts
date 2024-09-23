import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Coordinate } from './coordinate'

@Table({
  tableName: 'lock_stations',
  underscored: true,
  timestamps: false,
})
export class LockStation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Coordinate)
  @Column
  coordinateId!: number

  @BelongsTo(() => Coordinate)
  coordinate!: Coordinate
}