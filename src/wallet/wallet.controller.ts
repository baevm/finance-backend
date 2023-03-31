import { Controller, Post } from '@nestjs/common'
import { Body, Get } from '@nestjs/common/decorators'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { RtGuard } from 'src/auth/guards/rt.guard'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { WalletService } from './wallet.service'
import { WalletPageDto } from './dto/wallet-page.dto'

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(RtGuard)
  @Get('/getWallets')
  getWallets(@GetCurrentUser() user: CurrUser) {
    return this.walletService.getWallets(user.sub)
  }

  @UseGuards(RtGuard)
  @Get('/getIncomes')
  getIncomes(@Body() walletPageDto: WalletPageDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.getTransactions(user.sub, walletPageDto, 'INCOME')
  }

  @UseGuards(RtGuard)
  @Get('/getExpenses')
  getExpenses(@Body() walletPageDto: WalletPageDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.getTransactions(user.sub, walletPageDto, 'EXPENSE')
  }

  @UseGuards(RtGuard)
  @Post('/createWallet')
  createWallet(@Body() walletDto: CreateWalletDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.createWallet(walletDto, user.sub)
  }

  @UseGuards(RtGuard)
  @Post('/createTransaction')
  createTransaction(@Body() transactionDto: CreateTransactionDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.createTransaction(transactionDto, user.sub)
  }
}
