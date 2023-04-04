import { IsString, IsUUID } from 'class-validator'

export class TransactionDto {
  @IsUUID()
  walletId: string

  @IsUUID()
  id: string
}

export class UpdateTransactionDto extends TransactionDto {
  @IsString()
  title: string
}
