import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript'
import { User } from './user'

@Table({
  tableName: 'companies',
  underscored: true,
  timestamps: false,
})
export class Company extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  name!: string

  @HasMany(() => User)
  users!: User[]
}