import { IsString, Length, MaxLength } from 'class-validator'

export class AuthDto {
  @IsString()
  @Length(8, 255, { message: 'Логин должен быть больше 8 и меньше 255 символов' })
  username: string

  @IsString()
  @MaxLength(72, { message: 'Пароль должен быть меньше 72 символов' })
  password: string
}
