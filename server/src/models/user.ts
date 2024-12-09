import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { Company } from './company'
import { Trip } from './trip'

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

  @Unique
  @Column
  uid!: string

  @Column
  role!: string

  @ForeignKey(() => Company)
  @Column
  companyId!: number

  @BelongsTo(() => Company)
  company!: Company

  @HasMany(() => Trip)
  trips!: Trip[]
}