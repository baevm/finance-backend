import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { Wallet } from 'src/wallet/wallet.model'

interface UserCreate {
  username: string
  password: string
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreate> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: string

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.STRING, allowNull: true })
  hashedRt?: string

  @HasMany(() => Wallet)
  wallets?: Wallet[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date
}
