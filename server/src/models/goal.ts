import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user'

@Table({
  tableName: 'goals',
  underscored: true,
  timestamps: false,
})
export class Goal extends Model {
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
  startTime!: Date

  @Column
  endTime!: Date

  @Column
  goalDistance!: number
}