import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Wallet } from './wallet.model'

@Table({ tableName: 'transaction' })
export class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: string

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  walletId: string

  @BelongsTo(() => Wallet)
  wallet: Wallet

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number

  @Column({ type: DataType.ENUM('INCOME', 'EXPENSE'), allowNull: false })
  operation_type: 'INCOME' | 'EXPENSE'

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date
}
