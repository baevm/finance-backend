import { Controller, Get, UseGuards } from '@nestjs/common'
import { AtGuard } from 'src/auth/guards/at.guard'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userSerivce: UserService) {}

  @UseGuards(AtGuard)
  @Get('/me')
  getMe(@GetCurrentUser() currUser: CurrUser) {
    return this.userSerivce.getMe(currUser.sub)
  }
}
