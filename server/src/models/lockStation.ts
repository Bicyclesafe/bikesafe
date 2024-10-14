import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript'
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

  @Column
  groupId!: number

  @ForeignKey(() => Coordinate)
  @Column
  coordinateId!: number

  @BelongsTo(() => Coordinate, { onDelete: 'CASCADE' })
  coordinate!: Coordinate
}