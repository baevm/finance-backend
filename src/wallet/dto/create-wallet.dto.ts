import { IsString, MinLength } from 'class-validator'

export class CreateWalletDto {
  @IsString()
  @MinLength(1, { message: 'Название должно быть не меньше 1 символа' })
  title: string
}
