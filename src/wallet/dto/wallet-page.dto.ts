import { IsNumber, IsUUID } from 'class-validator'

export class WalletPageDto {
  @IsUUID()
  walletId: string

  @IsNumber()
  take: number

  @IsNumber()
  skip: number
}
