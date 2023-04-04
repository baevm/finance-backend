import { Controller, Post } from '@nestjs/common'
import { Body, Get, Param, Query } from '@nestjs/common/decorators'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { AtGuard } from 'src/auth/guards/at.guard'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreateWalletDto, UpdateWalletDto, WalletDto } from './dto/wallet.dto'
import { WalletService } from './wallet.service'
import { TransactionDto, UpdateTransactionDto } from './dto/update-transaction.dto'

@UseGuards(AtGuard)
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('/getWallets')
  getWallets(@GetCurrentUser() user: CurrUser) {
    return this.walletService.getWallets(user.sub)
  }

  @Get('/:id')
  getWallet(@Param('id') id: string, @GetCurrentUser() user: CurrUser) {
    return this.walletService.getWallet(id, user.sub)
  }

  @Get('/incomes/:id?')
  getIncomes(
    @Param('id') id: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @GetCurrentUser() user: CurrUser
  ) {
    return this.walletService.getTransactions(user.sub, { id, skip, take }, 'INCOME')
  }

  @Get('/expenses/:id?')
  getExpenses(
    @Param('id') id: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @GetCurrentUser() user: CurrUser
  ) {
    return this.walletService.getTransactions(user.sub, { id, skip, take }, 'EXPENSE')
  }

  @Post('/createWallet')
  createWallet(@Body() walletDto: CreateWalletDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.createWallet(walletDto, user.sub)
  }

  @Post('/updateWallet')
  updateWallet(@Body() body: UpdateWalletDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.updateWallet(body, user.sub)
  }

  @Post('/deleteWallet')
  deleteWallet(@Body() body: WalletDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.deleteWallet(body.walletId, user.sub)
  }

  @Post('/createTransaction')
  createTransaction(@Body() body: CreateTransactionDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.createTransaction(body, user.sub)
  }

  @Post('/updateTransaction')
  updateTransaction(@Body() body: UpdateTransactionDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.updateTransaction(body, user.sub)
  }

  @Post('/deleteTransaction')
  deleteTransaction(@Body() body: TransactionDto, @GetCurrentUser() user: CurrUser) {
    return this.walletService.deleteTransaction(body, user.sub)
  }
}
