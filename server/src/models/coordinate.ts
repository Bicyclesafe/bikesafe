import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({
  tableName: 'coordinates',
  underscored: true,
  timestamps: false,
})
export class Coordinate extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  lat!: number

  @Column
  lon!: number
}