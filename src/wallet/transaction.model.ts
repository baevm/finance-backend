import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { OperationType, OperationTypes } from './types/OperationType.type'
import { Wallet } from './wallet.model'

@Table({ tableName: 'transaction' })
export class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number

  @Column({ type: DataType.ENUM(...OperationTypes), allowNull: false })
  operation_type: OperationType

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date
}
