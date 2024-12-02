import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript'

@Table({
  tableName: 'achievements',
  underscored: true,
  timestamps: false,
})
export class Achievement extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Unique
  @Column
  name!: string

  @Column
  requirements!: number[]
}