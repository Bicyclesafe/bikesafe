import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user'

@Table({
  tableName: 'commute',
  underscored: true,
  timestamps: false,
})
export class Commute extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user!: User

  @Column
  distance!: number
}