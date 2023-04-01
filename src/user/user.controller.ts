import { Controller, Post, UseGuards } from '@nestjs/common'
import { AtGuard } from 'src/auth/guards/at.guard'
import { UserService } from './user.service'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'

@Controller('user')
export class UserController {
  constructor(private userSerivce: UserService) {}

  @UseGuards(AtGuard)
  @Post('/me')
  getMe(@GetCurrentUser() currUser: CurrUser) {
    return this.userSerivce.getMe(currUser.sub)
  }
}
