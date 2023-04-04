import { IsString, IsUUID, MinLength } from 'class-validator'

export class WalletDto {
  @IsUUID()
  walletId: string
}

export class CreateWalletDto {
  @IsString()
  @MinLength(1, { message: 'Название должно быть не меньше 1 символа' })
  title: string
}

export class UpdateWalletDto {
  @IsUUID()
  walletId: string

  @IsString()
  @MinLength(1, { message: 'Название должно быть не меньше 1 символа' })
  title: string
}
