import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Transaction } from './transaction.model'

@Table({ tableName: 'wallet' })
export class Wallet extends Model<Wallet> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @BelongsTo(() => User)
  user: User

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  balance: number

  @HasMany(() => Transaction)
  transactions: Transaction[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date
}
