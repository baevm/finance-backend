import { Body, Controller, HttpException, Post, Res } from '@nestjs/common'
import { HttpCode, UseGuards } from '@nestjs/common/decorators'
import { HttpStatus } from '@nestjs/common/enums'
import { Response } from 'express'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { ACCESS_TOKEN, HALF_HOUR, REFRESH_TOKEN } from 'src/common/token.const'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RtGuard } from './guards/rt.guard'
import { ONE_DAY } from 'src/common/token.const'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @Public()
  @Post('/login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto)

    res.cookie(ACCESS_TOKEN, tokens.accessToken, {
      secure: true,
      httpOnly: false,
      maxAge: HALF_HOUR * 1000,
      sameSite: 'none',
      domain: 'localhost',
    })

    res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
      secure: true,
      httpOnly: false,
      maxAge: ONE_DAY * 1000,
      sameSite: 'none',
      domain: 'localhost',
    })

    return tokens
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  async refreshToken(@GetCurrentUser() user: CurrUser, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refreshToken(user.sub, user.refreshToken)

    res.cookie(ACCESS_TOKEN, tokens.accessToken, {
      secure: true,
      httpOnly: false,
      maxAge: HALF_HOUR * 1000,
      sameSite: 'none',
      domain: 'localhost',
    })

    res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
      secure: true,
      httpOnly: false,
      maxAge: ONE_DAY * 1000,
      sameSite: 'none',
      domain: 'localhost',
    })

    return tokens
  }

  @UseGuards(RtGuard)
  @Post('/logout')
  async logout(@GetCurrentUserId() userId: string, @Res({ passthrough: true }) res: Response) {
    res.cookie(ACCESS_TOKEN, '', {
      secure: true,
      httpOnly: false,
      maxAge: 1,
      sameSite: 'none',
      domain: 'localhost',
    })

    res.cookie(REFRESH_TOKEN, '', {
      secure: true,
      httpOnly: false,
      maxAge: 1,
      sameSite: 'none',
      domain: 'localhost',
    })

    return this.authService.logout(userId)
  }
}
