import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Transaction } from './transaction.model'
import { WalletController } from './wallet.controller'
import { Wallet } from './wallet.model'
import { WalletService } from './wallet.service'

@Module({
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
  imports: [SequelizeModule.forFeature([Wallet, Transaction])],
})
export class WalletModule {}
