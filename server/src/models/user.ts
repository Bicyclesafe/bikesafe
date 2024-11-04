import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript'

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  @Unique
  uid!: string

  @Column
  role!: string
}