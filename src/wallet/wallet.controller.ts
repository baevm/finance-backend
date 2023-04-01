import { Controller, Post } from '@nestjs/common'
import { Body, Get } from '@nestjs/common/decorators'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { AtGuard } from 'src/auth/guards/at.guard'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { WalletPageDto } from './dto/wallet-page.dto'
import { WalletService } from './wallet.service'

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(AtGuard)
  @Get('/getWallets')
  getWallets(@GetCurrentUser() user: CurrUser) {
    return this.walletService.getWallets(user.sub)
  }

  @UseGuards(AtGuard)
  @Get('/getIncomes')
  getIncomes(@Body() walletPageDto: WalletPageDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.getTransactions(user.sub, walletPageDto, 'INCOME')
  }

  @UseGuards(AtGuard)
  @Get('/getExpenses')
  getExpenses(@Body() walletPageDto: WalletPageDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.getTransactions(user.sub, walletPageDto, 'EXPENSE')
  }

  @UseGuards(AtGuard)
  @Post('/createWallet')
  createWallet(@Body() walletDto: CreateWalletDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.createWallet(walletDto, user.sub)
  }

  @UseGuards(AtGuard)
  @Post('/createTransaction')
  createTransaction(@Body() transactionDto: CreateTransactionDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.createTransaction(transactionDto, user.sub)
  }
}
