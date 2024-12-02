import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user'
import { Achievement } from './achievement'

@Table({
  tableName: 'user_achievements',
  underscored: true,
  timestamps: false,
})
export class UserAchievement extends Model {
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
  level!: number

  @ForeignKey(() => Achievement)
  @Column
  achievementId!: number

  @BelongsTo(() => Achievement, { onDelete: 'CASCADE' })
  achievement!: Achievement
}