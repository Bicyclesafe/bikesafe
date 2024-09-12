//import { DataType } from 'sequelize'
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript'

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

  @Column(DataType.FLOAT)
  lat!: number

  @Column(DataType.FLOAT)
  lng!: number
}