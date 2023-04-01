import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt/dist'
import { Tokens } from './types/tokens.type'
import { HALF_HOUR, ONE_DAY } from 'src/common/token.const'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signup(dto: AuthDto) {
    const isExist = await this.userService.findByUsername(dto.username)

    if (isExist) {
      throw new HttpException({ message: 'Пользователь с таким именем уже существует' }, HttpStatus.BAD_REQUEST)
    }

    const hashedPass = await this.hashData(dto.password)

    await this.userService.createUser(dto.username, hashedPass)

    return { message: 'ok' }
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.userService.findByUsername(dto.username)

    if (!user) {
      throw new HttpException({ message: 'Пользователь с таким именем или паролем не найден' }, HttpStatus.BAD_REQUEST)
    }

    const isPassMatch = await bcrypt.compare(dto.password, user.password)

    if (!isPassMatch) {
      throw new HttpException({ message: 'Пользователь с таким именем или паролем не найден' }, HttpStatus.BAD_REQUEST)
    }

    const tokens = await this.generateTokens(user.id, user.username)
    await this.updateRtHash(user.id, tokens.refreshToken)

    return tokens
  }

  async refreshToken(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userService.findById(userId)

    if (!user || !user.hashedRt) {
      throw new HttpException({ message: 'Доступ запрещен' }, HttpStatus.FORBIDDEN)
    }

    const rtMatch = await bcrypt.compare(rt, user.hashedRt)

    if (!rtMatch) {
      throw new HttpException({ message: 'Доступ запрещен' }, HttpStatus.FORBIDDEN)
    }

    const newTokens = await this.generateTokens(user.id, user.username)

    await this.updateRtHash(user.id, newTokens.refreshToken)

    return newTokens
  }

  async logout(userId: string) {
    await this.userService.updateUser({ id: userId, hashedRt: null })

    return { message: 'ok' }
  }

  async generateTokens(userId: string, username: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: userId, username }, { secret: 'superSecretAt', expiresIn: HALF_HOUR }),
      this.jwtService.signAsync({ sub: userId, username }, { secret: 'superSecretRt', expiresIn: ONE_DAY }),
    ])

    return { accessToken, refreshToken }
  }

  async updateRtHash(userId: string, rt: string) {
    const hashedRt = await this.hashData(rt)
    return this.userService.updateUser({ id: userId, hashedRt })
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10)
  }
}
